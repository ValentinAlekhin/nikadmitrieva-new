import React, { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'

import { ContentContext } from 'context/ContentState'

import IridescentText from 'components/IridescentText/IridescentText'

import { Wrapper } from './styled'

const exit = { opacity: 0, transition: { delay: 0.8 } }

const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const { loading: contentLoading } = useContext(ContentContext)

  const t1 = Date.now()

  window.onload = () => {
    const t2 = Date.now()
    const loadingTimeInSeconds = (t2 - t1) / 1000
    if (loadingTimeInSeconds > 1) {
      exit.transition.delay = 0
    }

    setLoading(false)
  }
  return (
    <AnimatePresence>
      {loading && contentLoading ? (
        <Wrapper initial={false} exit={exit}>
          <IridescentText text="Ника Дмитриева" />
        </Wrapper>
      ) : null}
    </AnimatePresence>
  )
}

export default Preloader
