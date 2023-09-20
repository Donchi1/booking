import axios from "@/hooks/axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import loginStyles from "@/styles/Login.module.css";
import Toast from "../../utils/Alert";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined
  });

  const [loading, setLoading] = useState(false);


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
      const res = await axios.post("/auth/forgot", credentials);
      const {message } = res.data;
      setLoading(false);
      Toast.success.fire({ text: message });
    } catch (err: any) {
      setLoading(false);
      Toast.error.fire({ text: err.response.data.message });
    }
  };

  return (
    <div className={loginStyles.login}>
      <div className={loginStyles.lContainer}>
        <form onSubmit={handleSubmit} className={loginStyles.lWrapper}>
          <h1 className={loginStyles.login_title}>Password Reset</h1>
          <div className={loginStyles.input_wrapper}>
            <input
              type="email"
              placeholder="Enter Email"
              id="email"
              onChange={handleChange}
              className={loginStyles.lInput}
            />
          </div>
          
          <div className={loginStyles.input_wrapper}>
            <button disabled={loading} className={loginStyles.lButton}>
             Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
