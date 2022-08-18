import React, { useEffect } from 'react';
import axios from 'axios';

const SocialUserCheck = () => {
  const sessionStorage = window.sessionStorage;
  useEffect(() => {
    let code = new URL(window.location.href);
    // console.log(code)

    const ACCESS_TOKEN = code.search.split('=')[1].split('&')[0];
    // console.log(ACCESS_TOKEN)
    const REFRESH_TOKEN = code.href.split('=')[2].split('&')[0];
    // console.log(REFRESH_TOKEN)

    sessionStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN)
    sessionStorage.setItem("REFRESH_TOKEN", REFRESH_TOKEN)

    const getUser = async () => {
      try {
        const res = await axios.get("http://13.125.227.9:8080/user/info", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            refresh_token: `Bearer ${REFRESH_TOKEN}`
          }
        })
        console.log(res.data)
        if(res.data.userStatus === "FIRST_SOCIAL_LOGIN") {
          window.location.href = "http://localhost:3000/user/signupsns"
        } else if(res.data.userStatus === "NORMAL") {
          window.location.href = "http://localhost:3000/"
        } else {
          window.alert("잘못된 접근입니다. 메인으로 돌아갑니다.")
          window.location.href = "http://localhost:3000/"
        }
      } catch(error) {
        console.log(error)
      }
    }
    getUser();
  })

  return (
    null
  )
}

export default SocialUserCheck