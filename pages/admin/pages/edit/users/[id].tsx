import styles from  "./single.module.scss";
import Sidebar from "@/pages/admin/components/sidebar/Sidebar";
import Navbar from "@/pages/admin/components/navbar/Navbar";
import Chart from "@/pages/admin/components/chart/Chart";
import List from "@/pages/admin/components/table/Table";
import useFetchSingle from "@/pages/admin/hooks/useFetchSingle"
import {useRouter} from "next/router"
import useFetch from "@/pages/admin/hooks/useFetch";
import {  BookingExtType } from "@/pages/admin/utils/types";

const Single = () => {
  const {id} = useRouter().query
  const userId = id
  
  const {data} = useFetchSingle(`/api/routes/users/getUser/${id}`)
  console.log(data)

  const [bookings]= useFetch(`/api/routes/bookings/getUserBookings/${userId}`)

  const myBooking: BookingExtType[]= bookings
  return (
    <div className={styles.single}>
      <Sidebar />
      <div className={styles.singleContainer}>
        <Navbar />
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.editButton}>Edit</div>
            <h1 className={styles.title}>Information</h1>
            <div className={styles.item}>
              <img
                src={data?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="profile"
                className={styles.itemImg}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>{data?.firstname} {data?.lastname}</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>{data?.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Phone:</span>
                  <span className={styles.itemValue}>{data?.phone}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Address:</span>
                  <span className={styles.itemValue}>
                  24 colyn {data?.city}  {data?.country}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Country:</span>
                  <span className={styles.itemValue}>{data?.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className={styles.bottom}>
        <h1 className={styles.title}>Last Transactions</h1>
          <List bookings={myBooking}/>
        </div>
      </div>
    </div>
  );
};

export default Single;
