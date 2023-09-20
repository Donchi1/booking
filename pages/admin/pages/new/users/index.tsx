import styles from "./new.module.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { makeMultiRequest} from "../../../utils/makeRequest";
import {userInputs} from "../../../formSource"
import Toast from "@/utils/Alert";

const New = () => {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      await makeMultiRequest.post("/api/routes/auth/register", {...info, file} );
      setLoading(false)
      Toast.success.fire({text: "successfully registered this user"})
    } catch (error: any) {
      setLoading(false)
      Toast.error.fire({text: error.response.data.message})
      
    }
  };

  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <Navbar />
        <div className={styles.top}>
          <h1>Add New User</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files && e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className={styles.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                  />
                </div>
              ))}
              <button disabled={loading} onClick={handleClick}>{!loading ? "Create" : "Creating..."}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
