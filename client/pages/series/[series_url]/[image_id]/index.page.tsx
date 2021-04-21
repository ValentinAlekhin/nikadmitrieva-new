import { FC, KeyboardEventHandler, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'

import { RootResponse, Image } from '@interfaces/ServerResponses'

import Layout from '@components/Layout/Layout'
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
  title: string
  links: {
    close: string
    next: string
    prev: string
  }
}

interface Query extends ParsedUrlQuery {
  image_id: string
  series_url: string
}

const Viewer: FC<Props> = ({ images, title, links }) => {
  const router = useRouter()
  const { image_id, series_url } = router.query as Query
  const { length } = images
  const { order, webp, jpg, placeholder } = images.find(
    ({ _id }) => _id === image_id
  )

  const keyPressedHandler = e => {
    // console.log(order)

    switch (e.key) {
      case 'Escape':
        router.push(links.close)
        break

      case 'ArrowRight':
        if (order === length) return
        router.push(links.next)
        break

      case 'ArrowLeft':
        if (order === 1) return
        router.push(links.prev)
        break

      default:
        break
    }
  }

  const handleRouteChange = () => {
    console.log(order)

    document.removeEventListener('keyup', keyPressedHandler, false)
    document.addEventListener('keyup', keyPressedHandler, false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    document.addEventListener('keyup', keyPressedHandler, false)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      document.removeEventListener('keyup', keyPressedHandler, false)
    }
  }, [])

  return (
    <Layout
      noHeader
      noFooter
      title={`| ${title}`}
      description={`Ника Дмитриева. Фотограф. Серия ${title}.`}
      url={router.asPath}
      image={`${jpg}?width=600`}
    >
      <Wrapper>
        <ProgressiveImage
          defaultImg={jpg}
          placeholder={placeholder}
          jpg={jpg}
          webp={webp}
        />

        {order !== 1 ? (
          <Link href={links.prev} passHref>
            <Prev>
              <PrevIcon icon="leftArrow" />
            </Prev>
          </Link>
        ) : null}

        <Link href={links.close} passHref>
          <Close>
            <CloseIcon icon="close" />
          </Close>
        </Link>

        {order !== length ? (
          <Link href={links.next} passHref>
            <Next>
              <NextIcon icon="rightArrow" />
            </Next>
          </Link>
        ) : null}
      </Wrapper>
    </Layout>
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
  const { images, series }: RootResponse = await res.json()

  const { title } = series.find(({ _id }) => _id === series_url)
  const seriesImages = images.filter(
    ({ series_id }) => series_id === series_url
  )

  const { order } = images.find(({ _id }) => _id === image_id)

  const links = {
    close: `/series/${series_url}`,
    prev: `/series/${series_url}/${images[order - 2]?._id}`,
    next: `/series/${series_url}/${images[order]?._id}`,
  }

  return { props: { images: seriesImages, links, title } }
}

export default Viewer
