
const USER_URL = 'http://localhost:3000/api/v1/users/';
const LOGIN_URL = 'http://localhost:3000/api/v1/login'

export default class UserAdapter {
  static getUser(){
      return (
        fetch(`${USER_URL}`)
        .then(res => res.json())
      )
  }

  static getLogin(username, password){
    return (
      fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
         username: username,
         password: password
        }
      })
    })
    .then(res => res.json())
    )
  }
}
