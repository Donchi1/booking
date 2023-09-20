import List from "../../components/list/List"
import {userColumns} from "../../datatableSource"

const users = () =>  <List columns={userColumns} where="getAllUsers"  />

export default  users