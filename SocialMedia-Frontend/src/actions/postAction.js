import * as PostApi from "../api/PostRequest";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESSFULL", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETRIEVING_FAILED" });
  }
};
