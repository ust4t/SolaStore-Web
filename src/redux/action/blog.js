import { fatchData } from "../../utils/fatchData";
import {
  GET_BLOG,
  GET_MAS_BLOG,
  GET_SINGLE_BLOG,
  NEXT_POST,
  PREV_POST,
} from "./type";

export const getBlog = () => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: GET_BLOG,
    payload: data.blogs,
  });
};
export const getMasBlog = () => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: GET_MAS_BLOG,
    payload: data.mas,
  });
};
export const getSingleBlog = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: GET_SINGLE_BLOG,
    payload: {
      single: data.blogs.find((d) => Number(d.id) === Number(id)),
      blogs: data.blogs,
    },
  });
};

export const nextPost = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: NEXT_POST,
    payload: data.blogs.find((d) => Number(d.id) === Number(id)),
  });
};
export const prevPost = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: PREV_POST,
    payload: data.blogs.find((d) => Number(d.id) === Number(id)),
  });
};
