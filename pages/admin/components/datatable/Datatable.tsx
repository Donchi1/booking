import styles from  "./datatable.module.scss";
import { DataGrid, GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { userColumns } from "../../datatableSource";
import {useRouter} from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ListDataType } from "../../utils/types";




const Datatable = ({columns, hotel, where}:ListDataType) => {
  const location = useRouter();
  const path = location.pathname.split("/")[4];

  const [list, setList] = useState<unknown[]>([]);
  const url = hotel ? `/api/routes/${path}/${where}?fromAdmin="true"`: `/api/routes/${path}/${where}`
  const [data, loading] = useFetch(url);


  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id:string, photo: string) => {
    try {
      await axios.delete(`/api/routes/${path}/delete/${id}?file=${photo}`);
      setList(list.filter((item:any) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params:GridRenderCellParams) => {
        return (
          <div className={styles.cellAction}>
            <Link href={`/admin/pages/edit/${path}/$[id]`} as={`/admin/pages/edit/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </Link>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id, params.row.imgId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.datatable}>
      <div className={styles.datatableTitle}>
        {path}
        <Link href={`/admin/pages/new/${path}`} className={styles.link}>
          Add New
        </Link>
      </div>
      <DataGrid
        className={styles.datagrid}
        rows={list as any}
        columns={columns.concat(actionColumn)}
        checkboxSelection
        loading={loading}
        getRowId={(row) => row._id || row.booking?._id}
      />
    </div>
  );
};

export default Datatable;
