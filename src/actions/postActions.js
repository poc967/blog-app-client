import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  CLEAR_POSTS,
} from "./types";
import axios from "axios";

export const getPosts = (payload) => async (dispatch) => {
  dispatch(setPostsLoading());
  const response = await axios.get(`${process.env.REACT_APP_base_url}/posts`, {
    withCredentials: true,
  });
  dispatch({
    type: GET_POSTS,
    payload: response.data,
  });
};

export const deletePost = (id) => async (dispatch) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_base_url}/posts/${id}`,
    {
      withCredentials: true,
    }
  );

  dispatch({
    type: DELETE_POST,
    payload: response.data._id,
  });
};

export const deleteAllPostsByUser = (user) => async () => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_base_url}/posts/deleteAllPostsByUser/${user}`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (post) => async (dispatch) => {
  const response = await axios.post(
    `${process.env.REACT_APP_base_url}/posts`,
    post,
    {
      withCredentials: true,
    }
  );

  dispatch({
    type: ADD_POST,
    payload: response.data,
  });
};

export const clearPosts = () => async (dispatch) => {
  dispatch({
    type: CLEAR_POSTS,
  });
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
