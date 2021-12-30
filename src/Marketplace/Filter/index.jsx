import React, { useState } from "react";
import styled from '@emotion/styled'

// Option Constants With Header as First Item
const bgOtions = ["Background", "Aquamarine","Army Green","Blue","Gray","New Punk Blue","Orange","Purple","Yellow"]
const clothesOptions = ["Clothes","none","Admirals Coat","Bandolier","Bayc T Black","Bayc T Red","Biker Vest","Black Holes T","Black Suit","Black T","Blue Dress","Bone Necklace","Bone Tee","Caveman Pelt","Cowboy Shirt","Guayabera","Hawaiian","Hip Hop","Kings Robe","Lab Coat","Leather Jacket","Leather Punk Jacket","Lumberjack Shirt","Navy Striped Tee","Pimp Coat","Prison Jumpsuit","Prom Dress","Puffy Vest","Rainbow Suspenders","Sailor Shirt","Service","Sleeveless Logo T","Sleeveless T","Smoking Jacket","Space Suit","Striped Tee","Stunt Jacket","Tanktop","Tie Dye","Toga","Tuxedo Tee","Tweed Suit","Vietnam Jacket","Wool Turtleneck","Work Vest"]
const earringOptions = ["Earring","none","Cross","Diamond Stud","Gold Hoop","Gold Stud","Silver Hoop","Silver Stud"]
const eyesOptions = ["Eyes","3d","Angry","Blindfold","Bloodshot","Blue Beams","Bored","Closed","Coins","Crazy","Cyborg","Eyepatch","Heart","Holographic","Hypnotized","Laser Eyes","Robot","Sad","Scumbag","Sleepy","Sunglasses","Wide Eyed","X Eyes","Zombie"]
const furOptions = ["Fur","Black","Blue","Brown","Cheetah","Cream","Dark Brown","Death Bot","Dmt","Golden Brown","Gray","Noise","Pink","Red","Robot","Solid Gold","Tan","Trippy","White","Zombie"]
const hatOptions = ["Hat","none","Army Hat","Baby's Bonnet","Bandana Blue","Bayc Flipped Brim","Bayc Hat Black","Bayc Hat Red","Beanie","Bowler","Bunny Ears","Commie Hat","Cowboy Hat","Faux Hawk","Fez","Fisherman's Hat","Girl's Hair Pink","Girl's Hair Short","Halo","Horns","Irish Boho","King's Crown","Laurel Wreath","Party Hat 1","Party Hat 2","Police Motorcycle Helmet","Prussian Helmet","S&m Hat","Safari","Sea Captain's Hat","Seaman's Hat","Short Mohawk","Spinner Hat","Stuntman Helmet","Sushi Chef Headband","Trippy Captain's Hat","Vietnam Era Helmet","Ww2 Pilot Helm"]
const mouthOptions = ["Mouth","Bored","Bored Bubblegum","Bored Cigar","Bored Cigarette","Bored Dagger","Bored Kazoo","Bored Party Horn","Bored Pipe","Bored Pizza","Bored Unshaven","Bored Unshaven Bubblegum","Bored Unshaven Cigar","Bored Unshaven Cigarette","Bored Unshaven Dagger","Bored Unshaven Kazoo","Bored Unshaven Party horn","Bored Unshaven Pipe","Bored Unshaven Pizza","Discomfort","Dumbfounded","Grin","Grin Diamond Grill","Grin Gold Grill","Grin Multicolored","Jovial","Phoneme ooo","Phoneme L","Phoneme Oh","Phoneme Vuh","Phoneme Wah","Rage","Small Grin","Tongue Out"]


const onOptionHeaderClicked = (filterType, dispatch) => {
  dispatch({type: 'toggleFilter', value: filterType})
}

const onOptionClicked = (option, filterType, dispatch) => {
  dispatch({type: 'select', key: filterType, value: option})
};

const DropDown = ({state, displayValue, options, filterType, dispatch}) => {
  return (
    <>
      <DropDownHeader onClick={() => onOptionHeaderClicked(filterType, dispatch)}>
        { displayValue || options[0]}
      </DropDownHeader>
      {(state.selectorIsOpen && state.selectedFilter === filterType) && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option, idx) => (
              idx !== 0 && <ListItem onClick={() => onOptionClicked(option, filterType, dispatch)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </>
  )
}

const Filter = ({state, dispatch}) => {
  return (
    <Main>
      <DropDownContainer>
        <DropDown state={state} displayValue={state.bg} options={bgOtions} filterType={"bg"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.clothes} options={clothesOptions} filterType={"clothes"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.earring} options={earringOptions} filterType={"earring"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.eyes} options={eyesOptions} filterType={"eyes"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.fur} options={furOptions} filterType={"fur"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.hat} options={hatOptions} filterType={"hat"} dispatch={dispatch}/>
        <DropDown state={state} displayValue={state.mouth} options={mouthOptions} filterType={"mouth"} dispatch={dispatch}/>
      </DropDownContainer>
    </Main>
  )
}

// Styles
const Main = styled("div")`
    margin: 0px 10px 0px 10px;
`;

const DropDownContainer = styled("div")`
    width: 170px;
`;

const DropDownHeader = styled("div")`
    padding: 0.4em 2em 0.4em 1em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 0.8rem;
    color: #BFC500;
    border: 0.1rem solid #BFC500;
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
`;

const DropDownListContainer = styled("div")`
    width: 170px;
    position:relative;
`;

const DropDownList = styled("ul")`
    width: 170px;
    position: absolute;
    padding: 0;
    margin: 0;
    padding-left: 1em;
    background: #BFC500;
    border:none;
    box-sizing: border-box;
    color: black;
    font-size: 0.8rem;
    font-weight: 500;
    height: 150px;
    overflow-y: scroll;
    &:first-child {
        padding-top: 0.8em;
    }
    cursor: pointer;
`;

const ListItem = styled("li")`
    list-style: none;
    margin-bottom: 0.8em;
    padding: 0.4em 2em 0.4em 1em;
    cursor: pointer;
`;

export default Filter
