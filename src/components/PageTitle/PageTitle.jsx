import React from 'react'
import styled from '@emotion/styled'

const PageTitle = ({ title }) => {
  return (
    <StyledTitle>
      {title}
    </StyledTitle>
  )
}

const StyledTitle = styled.div`
  margin: 2rem 0;
  text-transform: uppercase;
  font-size: 1.7em;
  font-weight: 800;
  font-style: italic;
  line-height: 1.2;
`

export default PageTitle
