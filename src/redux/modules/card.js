// Action 과 Reducer 사용을 편하게 하기 위한 패키지
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //immer : 불변성 관리
// import moment from "moment"; // Date객체와 유사
import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

//Actions
const LOAD = "post/LOAD";
const UPDATE = "post/UPDATE";
const CREATEPOST = "post/CREATEPOST";
const DELETEPOST = "post/DELETEPOST";


//reducer이 사용할 initialState
const initialState = {
    post: [
      {
          postId: 1,
          image: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          contents: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
          like: 5,
          likeCount: 2,
          commentCount: 2
      },
      {
        postId: 2,
        image: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        contents: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
        like: 5,
        likeCount: 2,
        commentCount: 2
    },
    {
      postId: 3,
      image: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contents: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
      like: 5,
      likeCount: 2,
      commentCount: 2
  },
  {
    postId: 4,
    image: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    contents: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
    like: 5,
    likeCount: 2,
    commentCount: 2
},
    ]
  }

// Action Creators
export function loadPost(post) {
    return { type: LOAD, post }
  }
  
  export function updatePost(post, params) {
    console.log("확인", post, params)
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
      await axios
      .get("http://13.125.227.9:8080/posts?", {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log(response, "데이터 불러오기");
        dispatch(createPost(response.data.content));
      })
      .catch((error) => {
        console.log("데이터 불러오기 실패", error);
      });
    //   try {
    //     const res = await axios.get("http://13.125.227.9:8080/post");
  
    //     dispatch(loadPost(res.data))
    //   } catch(error) {
    //     console.log(error)
    //   }
    }
  }
  
  // Reducer
  export default function reducer(state = initialState, action = {} ) {
    switch (action.type) {
      case "post/LOAD": {
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