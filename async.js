const redux = require("redux");
const axios = require("axios");
const reduxthunk = require("redux-thunk").default;
const createStore = redux.createStore;
const applymiddleware = redux.applyMiddleware;
const initialState = {
  loading: false,
  users: [],
  error: "",
};
const USERS_REQ = "USERS_REQ";
const USERS_SUCCESS = "USERS_SUCCESS";
const USERS_FAILURE = "USERS_FAILURE";

const usersRequest = () => {
  return {
    type: USERS_REQ,
  };
};

const usersSuccess = (users) => {
  return {
    type: USERS_SUCCESS,
    payload: users,
  };
};

const usersFailure = (error) => {
  return {
    type: USERS_FAILURE,
    payload: error,
  };
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQ:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

//async action creator function
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(usersRequest());
    axios.get("https://jonplaceholder.typicode.com/users").then(response=>{
    const users = response.data.map(user=>user.name)   
    dispatch(usersSuccess(users))
    }).catch(error=>{
        dispatch(usersFailure(error.message))
    });
  };
};

const store = createStore(reducer, applymiddleware(reduxthunk));
store.subscribe(()=>{
    console.log(store.getState());
})
store.dispatch(fetchUsers());
