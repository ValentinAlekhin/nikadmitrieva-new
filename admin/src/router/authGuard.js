import store from '../store/index'

export default function(from, to, next) {
  const { loading, isUserLoggedIn } = store.getters
  if (isUserLoggedIn && !loading) {
    next()
  } else next('/login')
}
