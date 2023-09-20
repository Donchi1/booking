
import { FaXmark } from "react-icons/fa6";

import reserveStyles from "@/styles/Reserve.module.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useMemo, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import Toast from "../../utils/Alert";
import StripePayment from "../stripe/StripePayment";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51MO9G1IpETtN3CkCygL0Y67vFGhNucc0SPRCs1wDfw2e8nFMTZWW443qhW0fcbXBpq3CoC8kXBDCUzG1Pzzf3Hd600uZEPEwdD');

const Reserve = ({ setOpen, openModal, hotelId }) => {
  const { data } = useFetch(`/api/routes/hotels/getHotelRooms/${hotelId}`);
 
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState(
      []
    );
  // const [hotelRoomsNoDup, setHotelRoomsNoDup] = useState([]);
  const { dates } = useContext(SearchContext);

 

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];
 
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
     //check how many room numbers selected for each hotel
  const getIdOccuranceRooms = (roomId) => hotelRooms.filter(each => each === roomId)

  const getRooms = useMemo(() =>{
    //get the actual hotels selected
      const filtered = data?.filter(each => {
        return selectedRooms.some(id => each.roomNumbers.some(e => e._id === id))

      })
      //total room info                  
      return filtered?.map((each) => {return {id: each._id, totalBookings:  getIdOccuranceRooms(each._id).length * alldates.length, title:each.title, price:each.price, totalBookPrice: getIdOccuranceRooms(each._id).length * each.price * alldates.length}})
    },[selectedRooms, data])

  
   const handleChecked = (item) => {
      item.pop()
      return item
   }



  const handleRoomNumbers = (obj) => {
    
    const idx = selectedRoomNumbers.indexOf(obj)
     
   const sliced = selectedRoomNumbers.filter((each, i) => i !== idx )
   
    return sliced
    
  }

   
  const handleSelect = (e, roomId, roomNumber, itm) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    setHotelRooms(
      checked
      ? [...hotelRooms, roomId]
      : handleChecked(hotelRooms))

      const obj = JSON.stringify({roomNumber, title:itm.title, price:itm.price})
      setSelectedRoomNumbers(
        checked ? 
        [...selectedRoomNumbers, obj]
        : handleRoomNumbers(obj)


      )
      // setHotelRoomsNoDup((prev) => {
      //   if(checked){
      //     if(prev.includes(roomId)) return prev
      //   return [...prev, roomId]
      //   }
      //  return hotelRooms.includes(roomId) ? prev : hotelRoomsNoDup.filter((item) => item !== roomId)
      // })
  };

  const handlePaymodal =() => {
    if(selectedRooms.length > 0){
      setOpen(false)
       setOpenPay(true)
       return
    }
    Toast.error.fire({text: "No room selected"})
    return
  }

  const handleClick = async () => {

   
      //strip payment with the total
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/api/routes/rooms/availability/${roomId}`, {
            dates: alldates          
          });

          return res.data;
        })
      );
      await axios.put("/api/routes/hotels/updateHotelTotalAndBooking", {bookings: getRooms})
      
  
  };
  return (
    <>
   {openModal && 
    <div className={reserveStyles.reserve}>
      
      <div className={reserveStyles.rContainer}>
        <span  className={reserveStyles.rClose}
          onClick={() => setOpen(false)}>

        <FaXmark/>
        </span>
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className={reserveStyles.rItem} key={item._id}>
            <div className={reserveStyles.rItemInfo}>
              <div className={reserveStyles.rTitle}>{item.title}</div>
              <div className={reserveStyles.rDesc}>{item.desc}</div>
              <div className={reserveStyles.rMax}>
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className={reserveStyles.rPrice}>${item.price}</div>
            </div>
            <div className={reserveStyles.rSelectRooms}>
              {item.roomNumbers.map((roomNumber) => (
                <div className={reserveStyles.room} key={roomNumber.number}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    checked={selectedRooms.includes(roomNumber._id)}
                    onChange={(e) => handleSelect(e, item._id, roomNumber.number, item)}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handlePaymodal} className={reserveStyles.rButton}>
          Reserve Now!
        </button>
      </div>
    </div>}
   
    {openPay && 
    <Elements stripe={stripePromise} >
      <StripePayment bookinInfo={getRooms} id={hotelId} dates={alldates} handleBook={handleClick} setOpenPay={setOpenPay} selectedRoomNumbers={selectedRoomNumbers}  />
      
      </Elements>
    }
    </>
  )
};

export default Reserve;
