import axios from "axios";
import TokenInstance from "../../axios/TokenInstance"

//Actions
const USER_WEIGHT_LOAD = "userweight/USER_WEIGHT_LOAD";

//reducer이 사용할 initialState
const initialState = {
  data: {
    data:
    [
      {
        id: "",
        savedDate: "",
        weight: "",
      }
    ]
  }
}

// Action Creators
export function loadWeight(data) {
  return { type: USER_WEIGHT_LOAD, data }
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
        const res = await TokenInstance.get("/api/bodyInfo")
        // console.log(res)
        dispatch(loadWeight(res.data))
      } catch (error) {
        // console.log(error)
      }
    }
  }
}

// Reducer
export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case "userweight/USER_WEIGHT_LOAD": {
      // console.log(state, action.data)
      return { data: action.data }
    }

    default: return state;
  }
}