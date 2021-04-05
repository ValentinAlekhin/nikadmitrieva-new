import { Switch, Route, useLocation } from 'react-router-dom'

import GlobalStyles from './style/GlobalStyles'

import Header from './layout/Header/Header'

const App = () => {
  const location = useLocation()

  return (
    <>
      <GlobalStyles />
      <Header />

      <Switch location={location} key={location.pathname}></Switch>
    </>
  )
}

export default App
