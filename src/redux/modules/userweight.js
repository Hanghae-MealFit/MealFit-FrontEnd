import axios from "axios";

//Actions
const USER_WEIGHT_LOAD = "userweight/USER_WEIGHT_LOAD";

//reducer이 사용할 initialState
const initialState = {
  data: [
    {
      id: "",
      savedDate: "",
      weight: "",
    }
  ]
}

// Action Creators
export function loadWeight(user) {
  return { type: USER_WEIGHT_LOAD, user }
}
  
// middlewares
export const loadUserWeightDB = () => {
  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };
  return async function (dispatch) {
    if (auth.authorization !== null && auth.refresh_token !== null) {
      try {
        const res = await axios.get("http://13.125.227.9:8080/api/bodyInfo",
          {
            headers: {
              Authorization: `Bearer ${auth.authorization}`,
              refresh_token: `Bearer ${auth.refresh_token}`
            },
          })
        console.log(res.data)
        dispatch(loadWeight(res.data))
      } catch (error) {
        console.log(error)
      }
    }
  }
}
  
// Reducer
export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case "userweight/USER_WEIGHT_LOAD": {
      console.log(state, action.user)
      return { user: action.user }
    }

    default: return state;
  }
}