
import Accord from '../../../components/accord/Accord'
import Header from '../../../components/header/Header'
import Loader from '../../../components/loader/loader'
import Navbar from '../../../components/navbar/Navbar'
import useFetch from '../../../hooks/useFetch'
import { convertCurrency } from '../../../utils/converter'
import orderStyles from  "@/styles/Orders.module.css"
import { useRouter } from "next/router"

function Orders() {
 
  const {slug} = useRouter().query

  
  const info ={
    id: slug && slug[0],
    hotelId: slug && slug[1]
  }

  
  const {data, loading} = useFetch(`/api/routes/bookings/getUserBookings/${info.id}/${info.hotelId}`)
 
  console.log(data)


if(loading){
  return <Loader />
}
  return (
    <div>
        <Navbar />
      <Header type="bookings" />
      <Accord title="Reservations" />
      {data?.length !== 0 ? data?.map((single:any) => (

      <div className={orderStyles.orderContainer} key={single?.booking?._id}>
       
        <div className={orderStyles.orderItem}>
      <img src={single?.hotel?.photos[1]} alt="" className={orderStyles.oiImg} />
      <div className={orderStyles.oiDesc}>
        <h1 className={orderStyles.oiTitle}>{single?.hotel?.name}</h1>
        <span className={orderStyles.oiDistance}>{single?.hotel?.distance}m from center</span>
       
        <span className={orderStyles.oiTaxiOp}>Free airport taxi</span>
        <span className={orderStyles.oiSubtitle}>
          Studio Apartment with Air conditioning
        </span>
        <span className={orderStyles.oiFeatures}>{single?.hotel?.desc}</span>
        <span className={orderStyles.oiCancelOp}>Free cancellation </span>
        <span className={orderStyles.oiCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
       
        {single?.hotel?.rating && <div className={orderStyles.oiRating}>
          <span>Excellent</span>
          <button>{single?.hotel?.rating}</button>
        </div>}
        
          <span className={orderStyles.oiPrice}>${single?.hotel?.cheapestPrice}</span>
          <span className={orderStyles.oiTaxOp}>Includes taxes and fees</span>
          <span className={orderStyles.oiDistance}>{single?.hotel?.address}</span>
          
        
      </div>
      <div className={orderStyles.oiRoomContent}>
        <div>

      <h1 className={orderStyles.oiTitle}>Booked Rooms</h1>
      <div className={orderStyles.oiDetails}>
       {single?.booking.bookedRoomsInfo?.map((each: any, idx: number) => (
         
        <div className={orderStyles.oiDetailTexts} key={idx + Date.now()}>
          <span className={orderStyles.oiRoomN}>Room: {each?.roomNumber}</span>
          <span className={orderStyles.oiTaxOp}>Title: {each.title}</span>
          <span className={orderStyles.oiDistance}>price : {each.price}</span>
         
        </div>
       ))}
      </div>
      </div>
      <div>
         <h1 className={orderStyles.oiTitle}>More Infomations</h1>
         <div className={orderStyles.oiDetailTexts} >
          <span className={orderStyles.oiRoomN}>Total book: {single?.booking?.totalBookedRooms}</span>
          <span className={orderStyles.oiTaxOp}>Nights : {single.booking?.totalNights}</span>
          <span className={orderStyles.oiDistance}>Total Price : {convertCurrency(single?.booking?.totalPrice)}</span>
         
        </div>
       </div>
      
    </div>
       
      </div>
      </div>
      ) ) : 
      <div className={orderStyles.noReservation}>
        <h3>No reservation found</h3>
        </div>}
    </div>
  )
}

export default Orders