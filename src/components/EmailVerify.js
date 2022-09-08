import React from 'react'
import axios from 'axios'

const EmailVerify = () => {
  React.useEffect(() => {
    let code = new URL(window.location.href);

    const USER_NAME = code.href.split('=')[1].split('&')[0];
    const CODE = code.href.split('=')[2].split('&')[0];

    const userVerify = async () => {
      try {
        const res = await axios.get('http://43.200.174.111:8080/api/user/verify', {
          username: USER_NAME,
          code: CODE
        })
        console.log(res)
      } catch(error) {
        console.log(error)
      }
    }
    userVerify()
  }, [])
  return (
    null
  )
}

export default EmailVerify