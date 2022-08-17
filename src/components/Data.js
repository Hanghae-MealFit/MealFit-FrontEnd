import React,{ useEffect } from 'react'

const Data = () => {

  useEffect(() => {
    let code = new URL(window.location.href);
    console.log(code)

    if(code.search !== "") {
      const KakaoToken = code.searchParams.get("code");
      console.log("카카오", KakaoToken);
    } else if(code.hash !== "") {
      const NaverToken = code.href.split('=')[1].split('&')[0];
      const state = code.href.split('=')[2].split('&')[0];
      console.log("네이버", NaverToken);
      console.log("스테이트", state);
    }
  })

  return (
    <div>Data</div>
  )
}

export default Data