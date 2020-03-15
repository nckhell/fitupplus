//@flow
import store from 'store'

export const authenticate = (history, data) => {
  const { username, password } = data
  console.log(username)
  console.log(password)

  console.log("you're logged in. yay!")
  store.set('loggedIn', true)
  history.push('/')
}
