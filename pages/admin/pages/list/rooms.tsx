import List from "../../components/list/List"
import {roomColumns} from "../../datatableSource"

const Rooms = () =>  <List columns={roomColumns} where="getRooms" />

export default  Rooms