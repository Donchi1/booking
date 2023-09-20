import axios from "@/hooks/axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import loginStyles from "@/styles/Login.module.css";
import GoogleLoginBtn from "../../components/socialBtn/GoogleLoginBtn";
import FacebookLogins from "../../components/socialBtn/FacebookLogin";
import Toast from "../../utils/Alert";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.checked ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("/api/routes/auth/login", credentials);
      const { data, message } = res.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("userId", data._id);
      setLoading(false);
      Toast.success.fire({ text: message }).then(() => router.push("/"));
    } catch (err: any) {
      setLoading(false);
      Toast.error.fire({ text: err.response.data.message });
    }
  };

  return (
    <div className={loginStyles.login}>
      <div className={loginStyles.lContainer}>
        <form onSubmit={handleSubmit} className={loginStyles.lWrapper}>
          <h1 className={loginStyles.login_title}>Login</h1>
          <div className={loginStyles.input_wrapper}>
            <input
              type="text"
              placeholder="Username or Email"
              id="username"
              onChange={handleChange}
              className={loginStyles.lInput}
            />
          </div>
          <div className={loginStyles.input_wrapper}>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className={loginStyles.lInput}
            />
          </div>
          <div className={`${loginStyles.input_wrapper} ${loginStyles.check}`}>
            <div>
              <input
                id="rememberMe"
                type="checkbox"
                checked={credentials.rememberMe}
                onChange={() =>
                  setCredentials({
                    ...credentials,
                    rememberMe: !credentials.rememberMe,
                  })
                }
              />{" "}
              <label style={{ cursor: "pointer" }} htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <p>
              <Link href="/resetPassword">Forgot password ?</Link>
            </p>
          </div>
          <div className={loginStyles.input_wrapper}>
            <button disabled={loading} className={loginStyles.lButton}>
              Login
            </button>
          </div>
          <h4 className="or text-center">
            <b>OR</b>
          </h4>
          <div className={loginStyles.social_login}>
            <GoogleLoginBtn />
            <FacebookLogins />
          </div>
          <div className={loginStyles.login_footer}>
            <p>
              Don&apos;t have account?<Link href="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
