
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaXmark } from "react-icons/fa6";
import stripStyles from "@/styles/StripePayment.module.css";
import { convertCurrency } from "../../utils/converter";
import Toast from "../../utils/Alert";
import useFetch from "../../hooks/useFetch";


type StripeType = {
  bookinInfo: any[], setOpenPay:  Dispatch<SetStateAction<boolean>>, selectedRoomNumbers: any[], dates: string[], handleBook: () => any, id: string 
}

function StripePayment({ bookinInfo, setOpenPay, selectedRoomNumbers, dates, handleBook, id }: StripeType) {
  const { data } = useFetch(`/api/routes/hotels/getHotel/${id}`);
  const parsedRooms = selectedRoomNumbers.map((each) => JSON.parse(each));
  const { user } = useContext(AuthContext) as any;


  const stripe = useStripe();
  const elements = useElements();
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const [cardState, setCardState] = useState({
    error: undefined || "" || null,
    brand: null,
    disabled: false,
    isLoading: false,
    elementType: ""
  });

  const { error, brand, disabled, isLoading } = cardState;

  const total = bookinInfo.reduce((acc, init) => acc + init.totalBookPrice, 0);

  useEffect(() => {
    const getClientSecret = async () => {
      //api call
      try {
        const res = await axios.post(`/api/routes/payments/payment?amount=${total + 2 * 100}`);
        console.log(res.data)
        setSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    getClientSecret();
  }, [total]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(elements == null) return

    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setCardState({ ...cardState, error:submitError.message as any });
      return;
    }
    
    setCardState({ ...cardState, isLoading: true });
    try {
      const value = await stripe?.confirmCardPayment(secret, {
        payment_method: {
          card: elements?.getElement(CardElement) as any,
        },
      });
    
      const paymentIntendData = value?.paymentIntent;
     // make requst for Order
      await handleBook()
      const res = await axios.post(`/api/routes/bookings/create`, {
        bookings: bookinInfo,
        amount:paymentIntendData?.amount,
        parsedRooms,
        userId: user?._id ,
        hotelId: data?._id ,
        totalBookedDates: dates,
        payment_method: cardState?.elementType,
        currency: paymentIntendData?.currency,
      });
      setCardState({
        ...cardState,
        isLoading: false,
        disabled: false,
        error: null,
      });
      setOpenPay(false);
      Toast.success.fire({text: "Your reservation was successful"}).then(() => {
        router.push({pathname:`/order/[userId]/[hotelId]`, query:{userId:res.data.userId, hotelId:id}});
      });
    } catch (err: any) {
      console.log(err)
      Toast.error.fire({ text: err.message });
      setCardState({ ...cardState, isLoading: false, error: err.message });
    }
  };

  const handleChange = (e: any) => {
    console.log(e)
    setCardState({
      ...cardState,
      error: e.error ? e.error.message : "",
      disabled: e.empty,
      brand: e.brand,
    });
  };

  return (
    <div className={stripStyles.payment}>
      <div className={stripStyles.pContainer}>
        <span className={stripStyles.pClose} onClick={() => setOpenPay(false)}>
          <FaXmark />
        </span>
        <span>
          <h2>Booking Summary </h2>
        </span>
        <div className={stripStyles.itemContainer}>
          {parsedRooms?.map((item) => {
            return (
              <div className={stripStyles.pItem} key={item.room}>
                <div className={stripStyles.pInfo}>
                  <div className={stripStyles.rTitle}>{item.title}</div>
                  <div className={stripStyles.rPrice}>${item?.price}</div>
                  <div className={stripStyles.rMax}>
                    Room Number: <b>{item.roomNumber}</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr className={stripStyles.hr} />
        <form className={stripStyles.pform} onSubmit={handleSubmit}>
          <div className={stripStyles.sumContainer}>
            <div className={stripStyles.sumItem}>
              <h3>Subtotal</h3>
              <span>{convertCurrency(total)}</span>
            </div>
            <div className={stripStyles.sumItem}>
              <h4>Vat Rate</h4>
              <span>{convertCurrency(2)}</span>
            </div>
            <div>
              <div className={stripStyles.sumItem}>
                <h4>Total Rooms</h4>
                <span>
                  {parsedRooms.length} For {dates.length} days
                </span>
              </div>
              <div className={stripStyles.sumItem}>
                <h2>Total</h2>
                <h3>{convertCurrency(total + 2)}</h3>
              </div>
            </div>
          </div>
          <CardElement onChange={handleChange} />
          <div>
            <button
              disabled={!stripe || !elements || isLoading || disabled}
              className={stripStyles.pButton}
            >
              {isLoading ? "Loading..." : "Complete Your Booking"}
            </button>
            {error !== "" && <p className={stripStyles.stripeError}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StripePayment;
