import React from 'react'
import styled from '@emotion/styled'

const PageTitle = ({ title }) => {
  return (
    <StyledTitle>
      <h2>
        {title}
      </h2>
    </StyledTitle>
  )
}

const StyledTitle = styled.div`
  margin: 2rem 0;
`

export default PageTitle
