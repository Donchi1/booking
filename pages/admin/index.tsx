import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import styles from "./home/home.module.scss";
import Widget from "./components/widget/Widget";
import Featured from "./components/featured/Featured";
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table";
import useFetch from "./hooks/useFetch";
import { BookingExtType, HotelType, RoomType, UserType } from "./utils/types";


const Home = () => {
  const [users, loading]= useFetch("/api/routes/users/getAllUsers")
  const [rooms] = useFetch("/api/routes/rooms/getRooms") 
  const [hotels]= useFetch(`/api/routes/hotels/getHotels?fromAdmin=${true}`)
  const [bookings]= useFetch(`/api/routes/bookings/getAll?limit=${10}`)
  
   const myUsers:UserType[] = users
   const myRooms:RoomType[] = rooms
   const myHotels:HotelType[] = hotels
   const myBookings:BookingExtType[] = bookings
   
  const totalBookNum = myRooms?.map(each => each.roomNumbers.map((r)=> r.unavailableDates.length))
  const fBook  = [...totalBookNum].map((ea, i ) =>{
    return totalBookNum[i].reduce((acc, init) => acc + init, 0)

  })

  const totalBookings = fBook.reduce((acc, init) => acc + init,0)
  const totalBalance = myHotels.reduce((acc, init) => acc + init.totalBookPrice, 0)

 
  
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <Navbar />
        <div className={styles.widgets}>
          <Widget data={myUsers.length} type="user" />
          <Widget data={totalBookings} type="rooms" />
          <Widget data={hotels.length} type="hotels" />
          <Widget data={totalBalance} type="balance" />
        </div>
        <div className={styles.charts}>
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>Latest Bookings</div>
          <Table bookings={myBookings}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
