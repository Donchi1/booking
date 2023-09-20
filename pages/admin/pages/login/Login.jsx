import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useRouter();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });

        navigate.push("/admin/home");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
    }
  };

  return (
    <div className="login">
    <div className="lContainer">
    <form onSubmit={handleSubmit} className="lWrapper">
      <h1 className="login-title">Login</h1>
      
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
      
       
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
          />
        
        <button disabled={loading} className="lButton">
          {loading ? "submitting...": "Login"}
        </button>
        {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
