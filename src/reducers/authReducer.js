import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
  UPDATE_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    followedAccounts: null,
    about: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          [Object.keys(action.payload)]: action.payload[
            Object.keys(action.payload)
          ],
        },
      };
    case ADD_FOLLOWER:
    case REMOVE_FOLLOWER:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          followedAccounts: action.payload,
        },
      };
    case USER_LOADED:
      return {
        loading: false,
        isAuthenticated: true,
        user: {
          id: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          followedAccounts: action.payload.followedAccounts,
          about: action.payload.about,
        },
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        user: {
          id: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          followedAccounts: action.payload.followedAccounts,
          about: action.payload.about,
        },
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      return {
        isAuthenticated: false,
        loading: false,
        user: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          followedAccounts: null,
          about: null,
        },
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
