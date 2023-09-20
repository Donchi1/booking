import List from "../../components/list/List"
import {bookingColumns} from "../../datatableSource"

const Bookings = () =>  <List columns={bookingColumns} where="getAll"/>

export default  Bookings