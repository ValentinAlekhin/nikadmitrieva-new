import React, { FC, useState, useEffect, useRef } from 'react'

import { StyledImg, Picture } from './styled'

interface Props {
  webp?: string
  jpg: string
  avif?: string
  defaultImg: string
  alt?: string
}

const PictureElement: FC<Props> = ({ webp, jpg, avif, defaultImg, alt }) => {
  const [loading, setLoading] = useState(false)
  const imgRef = useRef<HTMLImageElement>()

  useEffect(() => {
    if (!imgRef.current.complete) {
      setLoading(true)
    }
  }, [])

  const onLoadHandler = () => {
    setLoading(false)
  }

  return (
    <Picture style={{ opacity: !loading ? 1 : 0 }}>
      {webp ? <source srcSet={webp} type="image/webp" /> : null}
      {jpg ? <source srcSet={jpg} type="image/jpeg" /> : null}
      {avif ? <source srcSet={avif} type="image/avif" /> : null}

      <StyledImg
        src={defaultImg}
        alt={alt}
        onLoad={onLoadHandler}
        ref={imgRef}
        loading="lazy"
      />
    </Picture>
  )
}

export default PictureElement
