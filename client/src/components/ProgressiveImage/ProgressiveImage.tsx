import React, { FC, useState, useEffect, useRef } from 'react'

import Picture from './Picture'

import { Wrapper, StyledImg } from './styled'

interface Props {
  className?: string
  defaultImg: string
  webp?: string
  jpg: string
  avif?: string
  placeholder: string
  alt?: string
}

const ProgressiveImage: FC<Props> = ({
  className,
  defaultImg,
  webp,
  jpg,
  avif,
  placeholder,
  alt,
}) => {
  const [loading, setLoading] = useState(false)
  const placeholderRef = useRef<HTMLImageElement>()

  useEffect(() => {
    if (!placeholderRef.current.complete) {
      setLoading(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadHandler = () => {
    setLoading(false)
  }

  return (
    <Wrapper className={className}>
      <StyledImg
        src={placeholder}
        alt={`${alt} placeholder`}
        ref={placeholderRef}
        onLoad={onLoadHandler}
      />
      {!loading ? (
        <Picture jpg={jpg} webp={webp} defaultImg={defaultImg} />
      ) : null}
    </Wrapper>
  )
}

export default ProgressiveImage
