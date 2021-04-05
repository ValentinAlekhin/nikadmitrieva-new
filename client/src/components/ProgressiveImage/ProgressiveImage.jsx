import React, { useState, useEffect, useRef } from 'react'

import { Wrapper, StyledImg, Picture } from './styled'

const ProgressiveImage = ({
  defaultImg,
  webp,
  jpg,
  avif,
  placeholder,
  alt,
}) => {
  const [imgLoad, setImgLoad] = useState(true)
  const imgRef = useRef()

  useEffect(() => {
    if (!imgRef.current.complete) {
      setImgLoad(false)
    }
  }, [])

  const onLoadHandler = () => setImgLoad(true)

  return (
    <Wrapper>
      <StyledImg src={placeholder} alt={`${alt} placeholder`} />
      <Picture style={{ opacity: imgLoad ? 1 : 0 }}>
        {webp ? <source srcSet={webp} type="image/webp" /> : null}
        {jpg ? <source srcSet={webp} type="image/jpeg" /> : null}
        {avif ? <source srcSet={webp} type="image/avif" /> : null}
        <StyledImg
          src={defaultImg}
          alt={alt}
          onLoad={onLoadHandler}
          ref={imgRef}
        />
      </Picture>
    </Wrapper>
  )
}

export default ProgressiveImage
