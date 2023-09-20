import axios from "axios";
import { useRouter } from "next/router";
import regStyles from "@/styles/Register.module.css";
import CountryDropdown from "../../components/CountryDropdown";
import Toast from "../../utils/Alert";
import { ChangeEvent,  FormEvent, useState } from "react";
import { makeMultiRequest } from "../../utils/makeRequest";
import Link from "next/link";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    city: "",
    
    phone: ""
  });

  const [file, setFile] = useState<File | Blob | null>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkEmail = (username:string) => {
    if(
     username.includes("@gmail.com") || 
     username.includes("@hotmail.com") ||
     username.includes("@yahoomail.com")||
     username.includes("@")
    ) return true
    return false
   }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(checkEmail(credentials?.username)) return Toast.error.fire({text: "Username must not contain @ or end with any domain"})
    setLoading(true)

    try {
      const res = await makeMultiRequest.post("/api/routes/auth/register", {...credentials, file});
      setLoading(false);
      Toast.success
        .fire({
          text: res.data.message,
        })
        .then(() => router.push("/login"));
    } catch (err: any) {
      setLoading(false);
      Toast.error.fire({
        text: err.response.data.error,
      });
    }
  };

  return (
    <div className={regStyles.register}>
      <div className={regStyles.lContainer}>
        <form onSubmit={handleSubmit} className={regStyles.lWrapper}>
          <h1 className={regStyles.register_title}>Register</h1>
          <div className={regStyles.input_wrapper}>
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              onChange={handleChange}
              required
              className={regStyles.lInput}
            />
            <input
              type="text"
              placeholder="Lastname "
              onChange={handleChange}
              required
             className={regStyles.lInput}
              name="lastname"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder=" Email"
              name="email"
              onChange={handleChange}
              required
             className={regStyles.lInput}
            />

            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
             className={regStyles.lInput}
            />
          </div>
          <div className="input-wrapper">

            <input
              type="tel"
              placeholder=" PhoneNumber"
              name="phone"
              onChange={handleChange}
              required
             className={regStyles.lInput}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
             className={regStyles.lInput}
            />
          </div>
          <div className="input-wrapper">
            <CountryDropdown state={credentials} setState={setCredentials} />

            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
              required
             className={regStyles.lInput}
            />
          </div>
          <div className="input-wrapper">
           
            <input
              type="file"
              placeholder="Photo"
              name="file"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
              required
              multiple
             className={regStyles.lInput}
            />
          </div>

          <div className={regStyles.input_wrapper}>
            <button disabled={loading} className={regStyles.lButton}>
             {loading ? "Submitting..." : "Register"}
            </button>
          </div>

          <div className={regStyles.register_footer}>
            <p>
              Already have account?<Link href="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
