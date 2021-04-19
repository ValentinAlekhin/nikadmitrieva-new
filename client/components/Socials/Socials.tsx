import { FC } from 'react'

import { Wrapper, SocialsLink, InstagramIcon, TelegramIcon } from './styled'

const socialsList = [
  { Ico: InstagramIcon, href: 'https://instagram.com/nd.lesss' },
  { Ico: TelegramIcon, href: 'https://t.me/nika_dmitrieva' },
]

const Socials: FC = ({}) => {
  return (
    <Wrapper>
      {socialsList.map(({ Ico, href }, i) => (
        <li key={i}>
          <SocialsLink href={href} target="_blank" rel="noopener noreferrer">
            <Ico />
          </SocialsLink>
        </li>
      ))}
    </Wrapper>
  )
}

export default Socials
