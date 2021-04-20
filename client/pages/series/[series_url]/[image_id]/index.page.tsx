import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'

import { RootResponse, Image } from '@interfaces/ServerResponses'

import ProgressiveImage from '@components/ProgressiveImage/ProgressiveImage'

import {
  Wrapper,
  Close,
  Prev,
  Next,
  PrevIcon,
  NextIcon,
  CloseIcon,
} from './styled'

interface Props {
  images: Image[]
}

interface Query extends ParsedUrlQuery {
  image_id: string
  series_url: string
}

const Viewer: FC<Props> = ({ images }) => {
  const { image_id, series_url } = useRouter().query as Query
  const { length } = images
  const { order, webp, jpg, placeholder } = images.find(
    ({ _id }) => _id === image_id
  )

  return (
    <Wrapper>
      <ProgressiveImage
        defaultImg={jpg}
        placeholder={placeholder}
        jpg={jpg}
        webp={webp}
      />

      {order !== 1 ? (
        <Link href={`/series/${series_url}/${images[order - 2]?._id}`} passHref>
          <Prev>
            <PrevIcon icon="leftArrow" />
          </Prev>
        </Link>
      ) : null}

      <Link href={`/series/${series_url}`} passHref>
        <Close>
          <CloseIcon icon="close" />
        </Close>
      </Link>

      {order !== length ? (
        <Link href={`/series/${series_url}/${images[order]?._id}`} passHref>
          <Next>
            <NextIcon icon="rightArrow" />
          </Next>
        </Link>
      ) : null}
    </Wrapper>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/client')
  const { images }: RootResponse = await res.json()

  const paths = images.map(({ _id: image_id, series_id: series_url }) => ({
    params: { image_id, series_url },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { image_id, series_url } = params
  const res = await fetch(`http://localhost:5000/api/client`)
  const { images }: RootResponse = await res.json()

  const seriesImages = images.filter(
    ({ series_id }) => series_id === series_url
  )

  return { props: { images: seriesImages } }
}

export default Viewer
