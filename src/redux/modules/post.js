import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

//Actions
const POST_LOAD = "post/POST_LOAD";
const UPDATE = "post/UPDATE";
const CREATEPOST = "post/CREATEPOST";
const DELETEPOST = "post/DELETEPOST";


//reducer이 사용할 initialState
const initialState = {
  post: [
    {
      content: "",
      createdAt: "",
      images: [],
      like: "",
      liked: "",
      nickname: "",
      postId: "",
      profileImage: "",
      updatedAt: "",
      view: ""
    },
  ]
}

// Action Creators
export function loadPost(post) {
  return { type: POST_LOAD, post }
}
  
export function updatePost(post, params) {
  // console.log("확인", post, params)
  return { type: UPDATE, payload: {post, params} }
}

export function createPost(post) {
  return { type: CREATEPOST, post }
}

export function delPost(post) {
  return { type: DELETEPOST, post }
}

// middlewares
export const loadPostDB = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get('http://43.200.174.111:8080/api/post?size=12')
      console.log(res)
      dispatch(loadPost(res.data))
    } catch(error) {
      console.log(error);
    }
  }
}
  
// Reducer
export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case "post/POST_LOAD": {
      return { post: action.post }
    }

    case "post/UPDATE": {
      state.post.find((include) => {
        if(include.title === action.title) {
          include.image = action.post.image;
          include.content = action.post.content;

          return;
        }
      })
        return {...state}
      }

      case "post/CREATEPOST" : {
        const new_post = [...state.post, ...action.post]
        state.post = new_post
        return { ...state }
      }

      default: return state;
    }
  }