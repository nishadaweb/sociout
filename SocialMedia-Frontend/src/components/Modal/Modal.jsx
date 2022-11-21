import React, { useState } from "react";
import "./Modal.scss";

import { useNavigate } from "react-router-dom";
// import Button from "../Controls/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../actions/otpAction";
import { verifyOtp } from "../../actions/verifyAction";
import { useEffect } from "react";
import { logOut } from "../../actions/AuthAction";

function Modal(props) {
  // const navigate = useNavigate()
  console.log(props, "  prooo");
  const {
    user: { mobile, email, username },
  } = props;

  const [display, setDisplay] = useState("block");
  const [method, setMethod] = useState("email");
  const [modal, setModal] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setErrMsg(false);
    setErrMsg("");
  }, []);
  const onClick = async (e) => {
    e.preventDefault();
    const response =
      method === "email"
        ? await dispatch(sendOtp(email))
        : await dispatch(sendOtp(mobile));
    const datajson = response;
    console.log(datajson.data.status, "gjhgjg");

    if (response.data.status) setModal(false);
    else {
      setError(true);

      setErrMsg(response.data.message);
      console.log(errMsg);
    }

    console.log("method", "=", method);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  function handleChange(e) {
    console.log(e.target, "ggggg");
    const { name, value } = e.target;
    console.log(value, name, "hjwh");
    setOtp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let OTP = Object.values(otp).join("");

    const type = method === "email" ? email : mobile;
    const result = await dispatch(verifyOtp({ OTP, type }));
    console.log(result, "ssssssssssss");
    if (result.status) {
      navigate("/");
    } else {
      console.log("jjjjjj");
      setDisplay("none");
      setErr("Verification failed");
    }
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const logout = async () => {
    dispatch(logOut());
  };
  return (
    <div style={{ height: "94vh" }}>
      <div className="verify-profile">
        <button className="button fc-button" onClick={logout}>
          Logout
        </button>
        <h2>{username}</h2>
        <h4>{email}</h4>
        <div>{err}</div>
        <button
          className="button fc-button"
          onClick={() => {
            setDisplay("block");
          }}
          id="myBtn"
        >
          Verify Account
        </button>
      </div>

      <div style={{ display: display }} id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span
              onClick={() => {
                setDisplay("none");
              }}
              className="close"
            >
              &times;
            </span>
            <h2>
              {" "}
              {modal ? "Select email or mobile" : "Verify your account"}{" "}
            </h2>
          </div>
          {modal && (
            <FormBody
              error={error}
              errMsg={errMsg}
              onClick={() => {
                setMethod("email");
              }}
              method={method}
              email={email}
              mobile={mobile}
              onButtonClick={onClick}
              onInputClick={() => {
                setMethod("mobile");
              }}
            />
          )}

          {!modal && (
            <OtpBody
              handleSubmit={handleSubmit}
              otp={otp}
              handleChange={handleChange}
              inputfocus={inputfocus}
              resendOtp={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const FormBody = (props) => {
  const {
    error,
    errMsg,
    onClick,
    method,
    email,
    mobile,
    onButtonClick,
    onInputClick,
  } = props;
  return (
    <form>
      <div className="modal-body">
        {error && (
          <div className="error-alert">
            {errMsg === /^Invalid/ ? "Invalid Number" : "Something went wrong"}
          </div>
        )}

        <div className="radio-grp">
          <input
            onClick={onClick}
            name={"method"}
            type={"radio"}
            //  checked={ method === 'email' ? true : false }
            defaultChecked={true}
            value={method}
            id="email"
          />
          <label htmlFor="email">
            <span style={{ paddingRight: "10px", color: "black" }}>
              {" "}
              Email:
            </span>
            <span style={{ fontSize: "15px" }}>{email}</span>
          </label>
        </div>
        <div className="radio-grp">
          <input
            onClick={onInputClick}
            name={"method"}
            type={"radio"}
            id="mobile"
            value={method}
          />
          <label htmlFor="contact">
            <span style={{ paddingRight: "10px", color: "black" }}>
              {" "}
              Mobile:
            </span>
            <span style={{ fontSize: "15px" }}>{mobile}</span>
          </label>
        </div>
      </div>

      <div className="modal-footer">
        <button onClick={onButtonClick} className="button fc-button">
          Send OTP
        </button>
      </div>
    </form>
  );
};

export const OtpBody = (props) => {
  const { handleSubmit, otp, handleChange, inputfocus, resendOtp } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="otpContainer">
          <input
            name="otp1"
            type="text"
            autoComplete="off"
            autoFocus="true"
            className="otpInput"
            value={otp.otp1}
            // onKeyPress={keyPressed}
            onChange={(e) => handleChange(e)}
            tabIndex="1"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp2}
            onChange={(e) => handleChange(e)}
            tabIndex="2"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp3}
            onChange={(e) => handleChange(e)}
            tabIndex="3"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp4}
            onChange={(e) => handleChange(e)}
            tabIndex="4"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />

          <input
            name="otp5"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp5}
            onChange={(e) => handleChange(e)}
            tabIndex="5"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp6"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp6}
            onChange={(e) => handleChange(e)}
            tabIndex="6"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button className="button fc-button" onClick={resendOtp}>
          Resend OTP
        </button>

        <button className="button fc-button">Verify OTP</button>
      </div>
    </form>
  );
};

export default Modal;
