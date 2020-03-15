//@flow
import store from 'store'

export const is_authenticated = () => !!store.get('loggedIn')
