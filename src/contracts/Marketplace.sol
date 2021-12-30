pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PHAYCMarketplace is ReentrancyGuard, Pausable, Ownable {
    IERC721 phaycContract;

    struct Offer {
        bool isForSale;
        uint phaycIndex;
        address seller;
        uint minValue; // in ether
        address onlySellTo;
    }

    struct Bid {
        bool hasBid;
        uint phaycIndex;
        address bidder;
        uint value;
    }

    // A record of PHAYC that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint => Offer) public phaycOfferedForSale;

    // A record of the highest bid
    mapping (uint => Bid) public phaycBids;

    // A record of pending ETH withdrawals by address
    mapping (address => uint) public pendingWithdrawals;

    event PhaycOffered(uint indexed phaycIndex, uint minValue, address indexed toAddress);
    event PhaycBidEntered(uint indexed phaycIndex, uint value, address indexed fromAddress);
    event PhaycBidWithdrawn(uint indexed phaycIndex, uint value, address indexed fromAddress);
    event PhaycBought(uint indexed phaycIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event PhaycNoLongerForSale(uint indexed phaycIndex);

    /* Initializes contract with an instance of PHAYC contract, and sets deployer as owner */
    constructor(address initialPhaycAddress) {
        IERC721(initialPhaycAddress).balanceOf(address(this));
        phaycContract = IERC721(initialPhaycAddress);
    }

    function pause() public whenNotPaused onlyOwner {
        _pause();
    }

    function unpause() public whenPaused onlyOwner {
        _unpause();
    }

    /* Returns the PHAYC contract address currently being used */
    function phaycAddress() public view returns (address) {
        return address(phaycContract);
    }

    /* Allows the owner of the contract to set a new PHAYC contract address */
    function setPhaycContract(address newPhaycAddress) public onlyOwner {
        phaycContract = IERC721(newPhaycAddress);
    }

    /* Allows the owner of a PHAYC to stop offering it for sale */
    function phaycNoLongerForSale(uint phaycIndex) public nonReentrant() {
        if (phaycIndex >= 10000) revert('token index not valid');
        if (phaycContract.ownerOf(phaycIndex) != msg.sender) revert('you are not the owner of this token');
        phaycOfferedForSale[phaycIndex] = Offer(false, phaycIndex, msg.sender, 0, address(0x0));
        emit PhaycNoLongerForSale(phaycIndex);
    }

    /* Allows a PHAYC owner to offer it for sale */
    function offerPhaycForSale(uint phaycIndex, uint minSalePriceInWei) public whenNotPaused nonReentrant()  {
        if (phaycIndex >= 10000) revert('token index not valid');
        if (phaycContract.ownerOf(phaycIndex) != msg.sender) revert('you are not the owner of this token');
        phaycOfferedForSale[phaycIndex] = Offer(true, phaycIndex, msg.sender, minSalePriceInWei, address(0x0));
        emit PhaycOffered(phaycIndex, minSalePriceInWei, address(0x0));
    }

    /* Allows a PHAYC owner to offer it for sale to a specific address */
    function offerPhaycForSaleToAddress(uint phaycIndex, uint minSalePriceInWei, address toAddress) public whenNotPaused nonReentrant() {
        if (phaycIndex >= 10000) revert();
        if (phaycContract.ownerOf(phaycIndex) != msg.sender) revert('you are not the owner of this token');
        phaycOfferedForSale[phaycIndex] = Offer(true, phaycIndex, msg.sender, minSalePriceInWei, toAddress);
        emit PhaycOffered(phaycIndex, minSalePriceInWei, toAddress);
    }

    /* Allows users to buy a PHAYC offered for sale */
    function buyPhayc(uint phaycIndex) payable public whenNotPaused nonReentrant() {
        if (phaycIndex >= 10000) revert('token index not valid');
        Offer memory offer = phaycOfferedForSale[phaycIndex];
        if (!offer.isForSale) revert('phayc is not for sale'); // phayc not actually for sale
        if (offer.onlySellTo != address(0x0) && offer.onlySellTo != msg.sender) revert();
        if (msg.value != offer.minValue) revert('not enough ether');          // Didn't send enough ETH
        address seller = offer.seller;
        if (seller == msg.sender) revert('seller == msg.sender');
        if (seller != phaycContract.ownerOf(phaycIndex)) revert('seller no longer owner of phayc'); // Seller no longer owner of phayc


        phaycOfferedForSale[phaycIndex] = Offer(false, phaycIndex, msg.sender, 0, address(0x0));
        phaycContract.safeTransferFrom(seller, msg.sender, phaycIndex);
        pendingWithdrawals[seller] += msg.value;
        emit PhaycBought(phaycIndex, msg.value, seller, msg.sender);

        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = phaycBids[phaycIndex];
        if (bid.bidder == msg.sender) {
            // Kill bid and refund value
            pendingWithdrawals[msg.sender] += bid.value;
            phaycBids[phaycIndex] = Bid(false, phaycIndex, address(0x0), 0);
        }
    }

    /* Allows users to retrieve ETH from sales */
    function withdraw() public nonReentrant() {
        uint amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    /* Allows users to enter bids for any PHAYC */
    function enterBidForPhayc(uint phaycIndex) payable public whenNotPaused nonReentrant() {
        if (phaycIndex >= 10000) revert('token index not valid');
        if (phaycContract.ownerOf(phaycIndex) == msg.sender) revert('you already own this phayc');
        if (msg.value == 0) revert('cannot enter bid of zero');
        Bid memory existing = phaycBids[phaycIndex];
        if (msg.value <= existing.value) revert('your bid is too low');
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        phaycBids[phaycIndex] = Bid(true, phaycIndex, msg.sender, msg.value);
        emit PhaycBidEntered(phaycIndex, msg.value, msg.sender);
    }

    /* Allows PHAYC owners to accept bids for their PHAYC */
    function acceptBidForPhayc(uint phaycIndex, uint minPrice) public whenNotPaused nonReentrant() {
        if (phaycIndex >= 10000) revert('token index not valid');
        if (phaycContract.ownerOf(phaycIndex) != msg.sender) revert('you do not own this token');
        address seller = msg.sender;
        Bid memory bid = phaycBids[phaycIndex];
        if (bid.value == 0) revert('cannot enter bid of zero');
        if (bid.value < minPrice) revert('your bid is too low');

        address bidder = bid.bidder;
        if (seller == bidder) revert('you already own this token');
        phaycOfferedForSale[phaycIndex] = Offer(false, phaycIndex, bidder, 0, address(0x0));
        uint amount = bid.value;
        phaycBids[phaycIndex] = Bid(false, phaycIndex, address(0x0), 0);
        phaycContract.safeTransferFrom(msg.sender, bidder, phaycIndex);
        pendingWithdrawals[seller] += amount;
        emit PhaycBought(phaycIndex, bid.value, seller, bidder);
    }

    /* Allows bidders to withdraw their bids */
    function withdrawBidForPhayc(uint phaycIndex) public nonReentrant() {
        if (phaycIndex >= 10000) revert('token index not valid');
        Bid memory bid = phaycBids[phaycIndex];
        if (bid.bidder != msg.sender) revert('the bidder is not message sender');
        emit PhaycBidWithdrawn(phaycIndex, bid.value, msg.sender);
        uint amount = bid.value;
        phaycBids[phaycIndex] = Bid(false, phaycIndex, address(0x0), 0);
        // Refund the bid money
        payable(msg.sender).transfer(amount);
    }
}
