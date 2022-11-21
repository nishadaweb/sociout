import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("image upload action ");
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};
export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_STARTED" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_COMPLETED", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAILED" });
  }
};
