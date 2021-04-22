import { FC } from 'react'

import { Wrapper, Text, FooterLink } from './styled'

interface Props {
  className?: string
}

const Footer: FC<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Text>
        Developed by&nbsp;
        <FooterLink href="http://alekhin.dev" target="_blank">
          Valentin Alekhin
        </FooterLink>
      </Text>
    </Wrapper>
  )
}

export default Footer
