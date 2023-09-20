import styles from  "./list.module.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import Datatable from "../datatable/Datatable"
import { ListDataType } from "../../utils/types"



const List = ({columns, hotel, where}:ListDataType ) => {
  return (
    <div className={styles.list}>
      <Sidebar/>
      <div className={styles.listContainer}>
        <Navbar/>
        <Datatable where={where} columns={columns} hotel={hotel}/>
      </div>
    </div>
  )
}

export default List