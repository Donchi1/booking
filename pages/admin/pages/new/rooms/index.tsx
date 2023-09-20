import styles from  "./newRoom.module.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { HotelType } from "@/pages/admin/utils/types";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState<string | undefined>(undefined);
  const [rooms, setRooms] = useState<string>("");

  //fetching all the hotels
  const [data, loading ] = useFetch("/api/routes/hotels/getHotels?fromAdmin='true'");

 const hotels:HotelType[] = data

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/api/routes/rooms/createRoom/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <Navbar />
        <div className={styles.top}>
          <h1>Add New Room</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <form>
              {roomInputs.map((input) => (
                <div className={styles.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className={styles.formInput}>
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className={styles.formInput}>
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : hotels &&
                      hotels.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
