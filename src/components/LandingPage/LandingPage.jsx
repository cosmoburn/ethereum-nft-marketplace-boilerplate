import React from 'react'
import styled from '@emotion/styled'

const LandingPage = () => {
  return (
    <Landing>
      <Header>LOGO + Socials</Header>
      <video src="https://ik.imagekit.io/bayc/assets/club-landing.mp4"/>
      <Footer>Footer Stuff</Footer>
    </Landing>
  )
}

const Landing = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
`

const Footer = styled.div`
  display: flex;
  height: 50px;
`

export default LandingPage
