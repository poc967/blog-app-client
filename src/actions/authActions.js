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
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { clearPosts, deleteAllPostsByUser } from "./postActions";

export const getUser = () => async (dispatch, getState) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_base_url}/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch(clearPosts());
    if (error.response) {
      dispatch(
        returnErrors(error.response.data.message, error.response.status)
      );
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const authenticateUser = ({ email, password }) => async (dispatch) => {
  const body = { email, password };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_base_url}/users/login`,
      body,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(
      returnErrors(
        error.response.data.message,
        error.response.status,
        "LOGIN_FAIL"
      )
    );
  }
};

export const registerUser = (newUser) => async (dispatch) => {
  const { firstName, lastName, email, password } = newUser;

  const body = { firstName, lastName, email, password };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_base_url}/users`,
      body,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch(
      returnErrors(
        error.response.data.message,
        error.response.status,
        "REGISTER_FAIL"
      )
    );
  }
};

export const destroySession = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_base_url}/users/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(clearPosts());
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
  }
};

export const deleteUser = (payload) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_base_url}/users/${payload}`, {
      withCredentials: true,
    });
    dispatch(deleteAllPostsByUser(payload));
    dispatch(destroySession());
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(setUserLoading());
  const { id, data } = payload;
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_base_url}/users/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
    });
    const message = error.response.data.message
      ? error.response.data.message
      : "Email is already associated with an existing account";
    const status = error.response.data.message
      ? error.response.status
      : error.response.data.code;
    dispatch(returnErrors(message, status));
  }
};

export const addFollower = (payload) => async (dispatch) => {
  dispatch(setUserLoading());
  const { currentUser, userToFollow } = payload;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_base_url}/users/add_followers/${currentUser}`,
      {
        userToFollow,
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADD_FOLLOWER,
      payload: response.data.followedAccounts,
    });
  } catch (error) {
    dispatch(returnErrors(error));
  }
};

export const deleteFollower = (payload) => async (dispatch) => {
  dispatch(setUserLoading());
  const { currentUser, userToUnfollow } = payload;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_base_url}/users/del_followers/${currentUser}`,
      {
        userToUnfollow,
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: REMOVE_FOLLOWER,
      payload: response.data.followedAccounts,
    });
  } catch (error) {
    dispatch(returnErrors(error));
  }
};
