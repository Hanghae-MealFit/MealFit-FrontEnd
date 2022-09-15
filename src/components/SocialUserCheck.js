import React from 'react';

const SocialUserCheck = () => {
  const sessionStorage = window.sessionStorage;
  React.useEffect(() => {
    let code = new URL(window.location.href);

    const ACCESS_TOKEN = code.href.split('=')[1].split('&')[0];
    const REFRESH_TOKEN = code.href.split('=')[2].split('&')[0];
    const USER_CHECK = code.href.split('=')[3].split('&')[0];
    
    sessionStorage.setItem("accessToken", ACCESS_TOKEN)
    sessionStorage.setItem("refreshToken", REFRESH_TOKEN)

    const getUser = async () => {
      if(USER_CHECK === "true") {
        window.location.href = "http://mealfit.co.kr/user/signupsns"
      } else {
        window.location.href = "http://mealfit.co.kr/"
      }
    }
    getUser();
  }, [])

  return (
    null
  )
}

export default SocialUserCheck