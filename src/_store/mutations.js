export default {
  SET_USERNAME(state, username) {
    state.username = username
    window.localStorage.setItem('username', username)
  },
}
