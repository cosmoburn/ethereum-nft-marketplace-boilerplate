import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'

import CommonContainer from '../CommonContainer/CommonContainer'
import PrimaryButton from '../PrimaryButton/PrimaryButton'


const LandingPage = () => {
  return (
    <Landing>
      <CommonContainer>
        <Header>
          <HeaderLogo>
            <Image
              preview={false}
              src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
              alt=""
              style={{ width: "200px", height: "auto", paddingTop: "2.5rem", marginBottom: "-28px"}}
            />
          </HeaderLogo>
          <HeaderSocial>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} color="white" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} color="white" />
            </a>
            <a href="https://discord.com/invite/xkh9AEbgNH">
              <FontAwesomeIcon icon={faDiscord} color="white" />
            </a>
            <a href="https://twitter.com/phunkyApeYC" >
              <FontAwesomeIcon icon={faTwitter} color="white" />
            </a>
          </HeaderSocial>
        </Header>
      </CommonContainer>
      <CommonContainer>
        <Content>
          <ReactPlayer
            playing
            loop
            muted
            url="https://ik.imagekit.io/nldjkvbypwl/flipped_FNa-Twypl.mp4?updatedAt=1640903473924"
            width="100%"
            height="auto"
          />
          <CTA>
            <CTAText>
              Welcome to the <br/>
              Phunky ape <br/>
              yacht club
            </CTAText>
            <CTAButton>
              <Link to="/marketplace">
                <PrimaryButton text="Enter marketplace" />
              </Link>
            </CTAButton>
          </CTA>
        </Content>
        <ProjectDescription>
          A limitless NFT collection where the token itself doubles as a statement that we are sick<br/>
          and tired of the red tape mentality perpetuated by the right facing Blue Chips.
        </ProjectDescription>
      </CommonContainer>
      <Footer>
        <HeaderLogo>
          <Image
            preview={false}
            src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
            alt=""
            style={{ width: "200px", height: "auto", paddingTop: "2.5rem", marginBottom: "-28px"}}
          />
        </HeaderLogo>
        <HeaderSocial>
          <a href="#">
            <FontAwesomeIcon icon={faYoutube} color="white" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} color="white" />
          </a>
          <a href="https://discord.com/invite/xkh9AEbgNH">
            <FontAwesomeIcon icon={faDiscord} color="white" />
          </a>
          <a href="https://twitter.com/phunkyApeYC" >
            <FontAwesomeIcon icon={faTwitter} color="white" />
          </a>
        </HeaderSocial>
      </Footer>
    </Landing>
  )
}

const Landing = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  z-index: 10;
`

const HeaderLogo = styled.div`
  grid-column-start: 2;
  display: flex;
  justify-content: center;
`

const HeaderSocial = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px;
  margin-bottom: -55px;
  
  
  a {
    padding: 20px 0 20px 20px;
  }
`

const Content = styled.div`
  display: flex;
  position: relative;
`

const CTA = styled.div`
  position: absolute;
  background: black;
  padding: 1rem .5rem 0 3rem;
  width: 440px;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const CTAText = styled.div`
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  text-align: right;
`

const CTAButton = styled.div`
  width: 90%;
  padding: 1rem 0 1.5rem 0; 
  border-bottom: 1px solid white;
`

const ProjectDescription = styled.div`
  padding: 3rem 15px;
  font-size: 1rem;
  font-weight: 400;
`

const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid white;
  padding-bottom: 6em;
`

export default LandingPage
