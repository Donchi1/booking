import hotelStyles from "@/styles/Hotel.module.css";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import MailList from "@/components/mailList/MailList";
import Footer from "@/components/footer/Footer";
import {
  FaCircleArrowLeft,
  FaCircleArrowRight,
  FaCircleXmark,
  FaLocationDot,
} from "react-icons/fa6";
import { useContext, useState } from "react";
import useFetch from "@/hooks/useFetch";
import {  useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";
import { AuthContext } from "@/context/AuthContext";
import Reserve from "@/components/reserve/Reserve";
import Loader from "@/components/loader/loader";
import Toast from "@/utils/Alert";
import Accord from "@/components/accord/Accord";
// import { getLocalStoredQuery } from "@/pages/list";



const Hotel = () => {

  const router = useRouter();
  const {id} = router.query;
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading} = useFetch(`/api/routes/hotels/getHotel/${id}`);
  const { user } = useContext(AuthContext);
  
  const {dates, options } = useContext(SearchContext);



  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1: Date, date2: Date) {
    
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
   
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
 

  const handleOpen = (i: number) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction: string) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  
  const handleClick = () => {
    if(days === 0) return Toast.error.fire({text: "No date selected. Please choose a date!"})
    if (user) {
      setOpenModal(true);
    } else {
      router.push("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      
      {loading ? (
        <Loader />
      ) : (
        <div className={hotelStyles.hotelContainer}>
          {open && (
            <div className={hotelStyles.slider}>
              <FaCircleXmark
                className={hotelStyles.close}
                onClick={() => setOpen(false)}
              />
              <FaCircleArrowLeft
                className={hotelStyles.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={hotelStyles.sliderWrapper}>
                <img
                  src={data?.photos[slideNumber]}
                  alt=""
                  className={hotelStyles.sliderImg}
                />
              </div>
              <FaCircleArrowRight
                className={hotelStyles.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={hotelStyles.hotelWrapper}>
            <button  className={hotelStyles.bookNow}>Reserve or Book Now!</button>
            <h1 className={hotelStyles.hotelTitle}>{data?.name}</h1>
            <div className={hotelStyles.hotelAddress}>
              <FaLocationDot />
              <span>{data?.address}</span>
            </div>
            <span className={hotelStyles.hotelDistance}>
              Excellent location – {data?.distance}m from center
            </span>
            <span className={hotelStyles.hotelPriceHighlight}>
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className={hotelStyles.hotelImages}>
              {data?.photos?.map((photo :string, i: number) => (
                <div className={hotelStyles.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className={hotelStyles.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={hotelStyles.hotelDetails}>
              <div className={hotelStyles.hotelDetailsTexts}>
                <h1 className={hotelStyles.hotelTitle}>{data?.title}</h1>
                <p className={hotelStyles.hotelDesc}>{data?.desc}</p>
              </div>
              <div className={hotelStyles.hotelDetailsPrice}>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data?.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {<Reserve setOpen={setOpenModal} openModal={openModal} hotelId={id}/>}
    
    </div>
  );
};

export default Hotel;
