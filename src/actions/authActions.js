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
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { clearPosts, deleteAllPostsByUser } from "./postActions";

export const getUser = () => async (dispatch, getState) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.get("/users", { withCredentials: true });
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
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
    const response = await axios.post("/users/login", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
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
    const response = await axios.post("/users", body);
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
    await axios.post("/users/logout");
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
    await axios.delete(`/users/${payload}`);
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
    const response = await axios.patch(`/users/${id}`, data);
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
  }
};
