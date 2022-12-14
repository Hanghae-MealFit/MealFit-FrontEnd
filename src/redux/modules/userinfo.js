import axios from "axios";
import TokenInstance from "../../axios/TokenInstance"

//Actions
const MAIN_USER_LOAD = "userinfo/MAIN_USER_LOAD";

//reducer이 사용할 initialState
const initialState = {
  user: {
    fastingInfo: {
      startFasting: "",
      endFasting: "",
    },
    nutritionGoal: {
      carbs: "",
      fat: "",
      kcal: "",
      protein: "",
    },
    userID: "",
    userProfile: {
      goalWeight: "",
      nickname: "",
      profileImage: null,
      providerType: "",
      userStatus: "",
    }
  }
}

// Action Creators
export function loadUser(user) {
    return { type: MAIN_USER_LOAD, user }
  }
  
// middlewares
export const loadMainUserDB = () => {
  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };
  return async function (dispatch) {
    if (auth.authorization !== null && auth.refresh_token !== null) {
      try {
        // const res = await TokenInstance.get("api/user/info")
        const res = await axios.get("http://43.200.174.111:8080/api/user/info",
          {
            headers: {
              Authorization: `Bearer ${auth.authorization}`,
              refresh_token: `Bearer ${auth.refresh_token}`
            },
          })
        console.log(res)
        dispatch(loadUser(res.data))
      } catch (error) {
        console.log(error)
      }
    }
  }
}
  
// Reducer
export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case "userinfo/MAIN_USER_LOAD": {
      // console.log(state, action)
      return { user: action.user }
    }

    default: return state;
  }
}