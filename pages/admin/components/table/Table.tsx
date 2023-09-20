import styles from "./table.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BookingExtType } from "../../utils/types"; 

const List = ({bookings}:{bookings: BookingExtType[]} ) => {
 
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>Trans ID</TableCell>
            <TableCell className={styles.tableCell}>Hotel</TableCell>
            <TableCell className={styles.tableCell}>Customer</TableCell>
            <TableCell className={styles.tableCell}>Date</TableCell>
            <TableCell className={styles.tableCell}>Amount</TableCell>
            <TableCell className={styles.tableCell}>Currency</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings?.map((row) => (
            <TableRow key={row?.booking._id}>
              <TableCell className={styles.tableCell}>{row?.booking?._id?.slice(0, 10)}</TableCell>
              <TableCell className={styles.tableCell}>
                <div className={styles.cellWrapper}>
                  <img src={row?.hotel?.photos[0]} alt="" className={styles.image} />
                  {row?.hotel.name}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>{row?.user.firstname}</TableCell>
              <TableCell className={styles.tableCell}>{new Date(row?.booking.createdAt).toDateString()}</TableCell>
              <TableCell className={styles.tableCell}>{row?.booking.totalPrice}</TableCell>
              <TableCell className={styles.tableCell}>{row?.booking.currency}</TableCell>
              <TableCell className={styles.tableCell}>
                <span className={`${styles.status} ${styles.success}`}>success</span>
              </TableCell>
            </TableRow>
          ))}
          {bookings.length === 0 &&  
          <TableRow >
              <TableCell  colSpan={10} className={`${styles.tableCell} ${styles.noInfo}`}>
                No booking found
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
