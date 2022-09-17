import React from 'react'
import axios from 'axios'

const Axios = () => {

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const instance = axios.create({
    baseURL: 'http://43.200.174.111:8080/',
    headers: {
      Authorization: `Bearer ${Token.authorization}`,
      refresh_token: `Bearer ${Token.refresh_token}`
    },
  });
}

export default Axios