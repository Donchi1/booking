import styles from  "@/pages/admin/components/datatable/datatable.module.scss";
import { GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";


export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 210,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div className={styles.cellWithImg} >
          <img className={styles.cellImg} src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 210,
  },

  {
    field: "firstname",
    headerName: "Firstname",
    width: 100,
  },
  {
    field: "lastname",
    headerName: "Lastname",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "photos",
    headerName: "Photo",
    width: 130,
    renderCell: (params:GridRenderCellParams) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row?.photos[0] || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />        
        </div>
      );
    },
  },

  {
    field: "distance",
    headerName: "Distance",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const bookingColumns = [
  { field: "booking", headerName: "ID", width: 150,  
  valueGetter : (params:GridValueGetterParams)=> {
    return params.row.booking._id
  } },

  {
    field: "user.firstname",
    headerName: "Customer",
    width: 200,
    renderCell: (params:GridRenderCellParams) => {
      return (
        <div className={styles.cellWithImg}>
          <span>{params.row?.user.firstname}</span>          
          <img className={styles.cellImg} src={params.row?.user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />        
        </div>
      );
    },
  },
  {
    field: "hotel.name",
    headerName: "Hotel",
    width: 100,
    valueGetter : (params:GridValueGetterParams)=> {
      return params.row.hotel.name
    }
  },
  {
    field: "total",
    headerName: "Price",
    width: 200,
    valueGetter : (params:GridValueGetterParams)=> {
      return params.row.booking.totalPrice
    }
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueGetter : (params: GridValueGetterParams)=> {
      return new Date(params.row.booking.createdAt).toDateString()
    }
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 100,
    valueGetter : (params: GridValueGetterParams)=> {
      return params.row.booking.currency
    }
  },
];
