import React, { useState } from 'react'

import { Wrapper, StyledImg, Picture } from './styled'

const ProgressiveImage = ({
  defaultImg,
  webp,
  jpg,
  avif,
  placeholder,
  alt,
}) => {
  const [imgLoad, setImgLoad] = useState(false)

  const onLoadHandler = () => setImgLoad(true)

  return (
    <Wrapper>
      <StyledImg src={placeholder} alt={`${alt} placeholder`} />
      <Picture style={{ opacity: imgLoad ? 1 : 0 }}>
        {webp ? <source srcSet={webp} type="image/webp" /> : null}
        {jpg ? <source srcSet={webp} type="image/jpeg" /> : null}
        {avif ? <source srcSet={webp} type="image/avif" /> : null}
        <StyledImg src={defaultImg} alt={alt} onLoad={onLoadHandler} />
      </Picture>
    </Wrapper>
  )
}

export default ProgressiveImage
