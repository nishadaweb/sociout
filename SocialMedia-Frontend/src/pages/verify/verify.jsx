import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import authReducer from "../../reducers/AuthReducer";

function Verify() {
  const { user } = useSelector((state) => state.authReducer.authData);

  console.log(user);
  return (
    <div>
      <Modal user={user} />
    </div>
  );
}

export default Verify;
