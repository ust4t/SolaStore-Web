import { GET_MAIN_MENU, GET_SUB_MENU } from "./type";
import { fatchData } from "../../utils/fatchData";
import axios from "axios";

export const getMenu = () => async (dispatch) => {
    dispatch({
      type: GET_MAIN_MENU,
      payload: await fatchData("/api/getMenu")
      
    });
  };

  export const getSubMenu = (id)=> async (dispatch)=> {
    const res = await axios.get(`/api/getSubMenu?id=${id}`)
    dispatch( {
      type: GET_SUB_MENU,
      payload: res.data
    })
  }