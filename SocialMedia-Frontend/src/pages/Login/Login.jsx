import { useState, useEffect } from "react";
import "./Login.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
// import authReducer from "../../reducers/AuthReducer";

const Login = () => {
  const msg = useSelector((state) => state.authReducer.message);
  console.log(msg);
  const [errmsg, setErrMsg] = useState("");
  useEffect(() => {
    console.log(msg, "latesterr");
    if (msg) setErrMsg(msg);
  }, [msg]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password required",
      label: "Password",
      required: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(logIn(values));
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
        <button className="submitBtn">Log in</button>
        <span
          style={{
            fontSize: "15px",
            cursor: "pointer",
            display: "block",
            color: "black",
          }}
        >
          Don't have an account??{" "}
          <span
            style={{ color: "blue", display: "inline" }}
            onClick={() => navigate("/signup")}
          >
            SIGNUP
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
