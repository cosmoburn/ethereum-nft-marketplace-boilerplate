import React from 'react'
import styled from '@emotion/styled'

const PrimaryButton = ({ onClick, text, children }) => {
  return (
    <StyledButton onClick={onClick}>
      {text}
      <div style={{ width: ".5rem" }}/>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: #bfc500;
  border-radius: 8px;
  color: #000;
  border: 0;
  font-weight: 700;
  font-size: 16px;
  padding: 8px 16px;
  margin: auto auto;
  transition: .3s;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  
  :hover {
    background: white;
  }
`

export default PrimaryButton
