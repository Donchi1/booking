import styles from "./sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link  from "next/link";
import { DarkModeContext } from "@/context/darkModeContext";
import { useContext } from "react";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch:authDispatch } = useContext(AuthContext);
  

//logout
const handleLogout = async() => {
  await axios.delete(`/api/routes/auth/logout`)
  localStorage.removeItem("user")
  authDispatch({type: "LOGOUT"})
  window.location.assign("/login")
}
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className={styles.logo}>donnybook</span>
        </Link>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <Link style={{ textDecoration: "none" }} href="/admin">

          <li>
            <DashboardIcon className={styles.icon} />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className={styles.title}>LISTS</p>
          <Link href="/admin/pages/list/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className={styles.icon} />
              <span>Users</span>
            </li>
          </Link>
          <Link href="/admin/pages/list/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className={styles.icon} />
              <span>Hotels</span>
            </li>
          </Link>
          <Link href="/admin/pages/list/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className={styles.icon} />
              <span>Rooms</span>
            </li>
          </Link>
          <Link href="/admin/pages/list/bookings" style={{ textDecoration: "none" }}>

          <li>
            <ShoppingCartOutlined className={styles.icon} />
            <span>Bookings</span>
          </li>
          </Link>
          <p className={styles.title}>USEFUL</p>
          <li>
            <InsertChartIcon className={styles.icon} />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className={styles.icon} />
            <span>Notifications</span>
          </li>
          <p className={styles.title}>SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className={styles.icon} />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className={styles.icon} />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className={styles.icon} />
            <span>Settings</span>
          </li>
          <p className={styles.title}>USER</p>
          <li>
            <AccountCircleOutlinedIcon className={styles.icon} />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className={styles.icon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
