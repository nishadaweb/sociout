import { useState, useEffect } from "react";
import "./SignUp.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../actions/AuthAction.js";
const SignUp = () => {
  const msg = useSelector((state) => state.authReducer.message);
  console.log(msg, "jhdhd");
  const [errmsg, setErrMsg] = useState("");
  useEffect(() => {
    console.log(msg, "latesterr");
    if (msg) setErrMsg(msg);
  }, [msg]);
  const [values, setValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "mobile",
      type: "numeric",
      placeholder: "Mobile Number",
      errorMessage: "It should be a valid Mobile Number!",
      label: "Mobile Number",
      pattern: `^[0-9+]{10,13}$`,
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(values));
  };

  const onChange = (e) => {
    setErrMsg("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        {errmsg && (
          <p style={{ color: "red", textAlign: "center" }}>{errmsg}</p>
        )}
        <h1>SOCIOUT</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="submitBtn" onClick={handleSubmit}>
          Sign up
        </button>
        <span
          style={{
            fontSize: "15px",
            cursor: "pointer",
            display: "inline",
            color: "black",
          }}
        >
          Already have an account??
          <span
            style={{ color: "blue", display: "inline" }}
            onClick={() => navigate("/auth")}
          >
            LOGIN
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
