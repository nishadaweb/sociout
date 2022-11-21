import * as OtpApi from "../api/OtpRequest";
export const sendOtp = (formdata) => async (dispatch) => {
  dispatch({ type: "OTP_START" });
  try {
    console.log("hdf", formdata);
    const data = await OtpApi.sendOtp(formdata);

    console.log(data, "jdjds");
    dispatch({ type: "OTP_COMPLETED", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "OTP_FAILED" });
  }
};
