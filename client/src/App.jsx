import { Switch, Route, useLocation } from 'react-router-dom'

import GlobalStyles from './style/GlobalStyles'

import Header from './layout/Header/Header'
import Home from './pages/Home/Home'
import Series from './pages/Series/Series'

const App = () => {
  const location = useLocation()

  return (
    <>
      <GlobalStyles />
      <Header />

      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <Route exact path="/series/:id" component={Series} />
      </Switch>
    </>
  )
}

export default App
