import List from "../../components/list/List"
import {hotelColumns} from "../../datatableSource"

const Hotels = () =>  <List hotel={true} columns={hotelColumns} where="getHotels" />

export default  Hotels