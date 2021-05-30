import { fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components'

const Fade = styled.div`
  height: 100%;
  animation: 0.6s ${keyframes`${fadeIn}`};
`

export default Fade
