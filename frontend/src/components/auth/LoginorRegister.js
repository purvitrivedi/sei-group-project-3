import React from "react";
import Login from "./Login";
import Register from "./Register";

const LoginOrRegister = (props) => {
  const { history } = props;
  return (
    <div className="background-login">
      <div className="form-submit">
        <Login history={history} />
        <Register history={history} />
      </div>
    </div>
  );
};

export default LoginOrRegister;
