import { FC, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { RootResponse } from '@interfaces/ServerResponses'

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
  Counter,
} from './styled'

interface Props {
  jpg: string
  webp: string
  placeholder: string
  length: number
  order: number
  title: string
  links: {
    close: string
    next: string
    prev: string
  }
}

const Viewer: FC<Props> = ({
  jpg,
  webp,
  placeholder,
  length,
  order,
  title,
  links,
}) => {
  const router = useRouter()

  const keyPressedHandler = (e: KeyboardEvent) => {
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

  useEffect(() => {
    document.addEventListener('keyup', keyPressedHandler, false)
    document.addEventListener('keyup', e => {}, false)

    return () => {
      document.removeEventListener('keyup', keyPressedHandler, false)
    }
  }, [router.asPath])

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

        <Counter>
          {order}/{length}
        </Counter>
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
  const { length } = images.filter(({ series_id }) => series_id === series_url)

  const { order, jpg, webp, placeholder } = images.find(
    ({ _id }) => _id === image_id
  )

  const links = {
    close: `/series/${series_url}`,
    prev: `/series/${series_url}/${images[order - 2]?._id}`,
    next: `/series/${series_url}/${images[order]?._id}`,
  }

  const props: Props = { links, title, jpg, webp, placeholder, length, order }

  return { props }
}

export default Viewer
