import axios from 'axios'

const sessionStorage = window.sessionStorage

const Token = {
  authorization: sessionStorage.getItem("accessToken"),
  refresh_token: sessionStorage.getItem("refreshToken")
}

const TokenInstance = axios.create({
  baseURL: 'http://43.200.174.111:8080/',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token.authorization}`,
    refresh_token: `Bearer ${Token.refresh_token}`
  },
});

export default TokenInstance