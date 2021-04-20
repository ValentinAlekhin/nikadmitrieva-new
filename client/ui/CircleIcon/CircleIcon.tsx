import { FC } from 'react'

import {
  Wrapper,
  PlusIcon,
  FullscreenIcon,
  CloseIcon,
  RightArrowIcon,
  LeftArrowIcon,
} from './styled'

export interface Props {
  icon: 'plus' | 'fullscreen' | 'rightArrow' | 'leftArrow' | 'close'
}

const CircleIcon: FC<Props> = ({ icon }) => {
  return (
    <Wrapper>
      {icon === 'plus' ? <PlusIcon /> : null}
      {icon === 'fullscreen' ? <FullscreenIcon /> : null}
      {icon === 'close' ? <CloseIcon /> : null}
      {icon === 'rightArrow' ? <RightArrowIcon /> : null}
      {icon === 'leftArrow' ? <LeftArrowIcon /> : null}
    </Wrapper>
  )
}

export default CircleIcon
