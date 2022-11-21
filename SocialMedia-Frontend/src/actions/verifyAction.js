import * as VerifyApi from "../api/VerifyRequest";
export const verifyOtp = (formdata) => async (dispatch) => {
  dispatch({ type: "VERIFY_START" });
  try {
    const { data } = await VerifyApi.verifyOtp(formdata);
    dispatch({ type: "VERIFY_COMPLETED", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "VERIFY_FAILED" });
  }
};
