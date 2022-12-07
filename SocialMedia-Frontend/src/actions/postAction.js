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
export const deletePost = (id, userId) => async (dispatch) => {
  dispatch({ type: "delete_START" });
  try {
    const { data } = await PostApi.deletePost(id, userId);
    console.log(data, "delete action");
    dispatch({ type: "REFRESH" });
    dispatch({ type: "delete_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "delete_FAIL" });
  }
};
