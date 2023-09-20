import styles from "./newHotel.module.scss"
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import { hotelInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios"

const NewHotel = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState<string[]>([]);

  const [ data, loading ] = useFetch("/api/routes/rooms/getRooms");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement> ) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     
      const newhotel = {
        ...info,
        rooms:rooms,
        photos: [...files as any],
      };

     
      await axios.post("/api/routes/hotels/createHotel", newhotel, {
        headers: {
            'Content-Type': 'multipart/form-data',
          }
      })
    } catch (err) {console.log(err)}
  };
  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <Navbar />
        <div className={styles.top}>
          <h1>Add New Product</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  required
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className={styles.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}
              <div className={styles.formInput}>
                <label>Featured</label>
                <select required id="featured" onChange={handleChange}>
                  <option value={false as any}>No</option>
                  <option value={true as any}>Yes</option>
                </select>
              </div>
              <div className={styles.selectRooms}>
                <label>Rooms</label>
                <select required id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
