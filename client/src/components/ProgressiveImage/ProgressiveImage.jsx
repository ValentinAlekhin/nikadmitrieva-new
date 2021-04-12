import React, { useState, useEffect, useRef, useContext } from 'react'

import { ContentContext } from 'context/ContentState'

import { Wrapper, StyledImg, Picture } from './styled'

const ProgressiveImage = ({
  className,
  defaultImg,
  webp,
  jpg,
  avif,
  placeholder,
  alt,
}) => {
  const { addImage, addLoadedImage } = useContext(ContentContext)
  const [imgLoad, setImgLoad] = useState(true)
  const imgRef = useRef()

  console.log(webp)

  useEffect(() => {
    addImage()
    if (!imgRef.current.complete) {
      setImgLoad(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadHandler = () => {
    setImgLoad(true)
    addLoadedImage()
  }

  const createSrcSet = (url, steps = 10, width = 200) =>
    Array(steps)
      .fill('')
      .map((_, i) => `${url}?width=${width * (i + 1)} ${width * (i + 1)}w`)
      .join(',\n')

  return (
    <Wrapper className={className}>
      <StyledImg src={placeholder} alt={`${alt} placeholder`} />
      <Picture style={{ opacity: imgLoad ? 1 : 0 }}>
        {webp ? <source srcSet={createSrcSet(webp)} type="image/webp" /> : null}
        {jpg ? <source srcSet={createSrcSet(jpg)} type="image/jpeg" /> : null}
        {avif ? <source srcSet={createSrcSet(avif)} type="image/avif" /> : null}
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
