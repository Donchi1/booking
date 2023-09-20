import navbarStyles from "@/styles/Navbar.module.css";
import Link from "next/link";
import {useRouter} from "next/router"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import useFetch from "../../hooks/useFetch";


const Navbar = () => {
  const {data} = useFetch(`/api/routes/hotels/getHotels?fromAdmin=${true}`)
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdow,setShowDropdown] = useState(false)
  const [openModal,setOpenModal] = useState(false)
  const [hotelId,setHotelId] = useState("")

  const navigate = useRouter()

 

   const handleLogout = async() => {
       await axios.delete(`/api/routes/auth/logout`)
       localStorage.removeItem("userId")
       dispatch({type: "LOGOUT"})
   }

   const handleReserve = () => {
    setOpenModal(false)
    setShowDropdown(false)
      navigate.push(`/order/${user._id}/${hotelId}`)
   }

   useEffect(() => {
     setHotelId(data ? data[0]?._id : "tyry")
   }, [data])


  
  return (
    <>
   
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navContainer}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img className="logo" src="/assets/imgs/donnybookw.png" alt="logo" />
        </Link>
        {user ? <div className={navbarStyles.userInfoCont}>
          <span onClick={() => setShowDropdown(!showDropdow)}>
            <img className={navbarStyles.navbarImage} src={user.img} alt="profile img"/>
            </span>
            <button className={navbarStyles.navButton} onClick={handleLogout}>Logout</button>
            <div className={`${navbarStyles.navbardropdown} ${showDropdow ? `${navbarStyles.active}` : null}`}>
              <div className={navbarStyles.dropdownwrapper}>
               <button onClick={() => {
                setOpenModal(true)
                setShowDropdown(false)
                }
              } className={navbarStyles.dropdownBtn} type="button">Reservations</button>
              </div>
            </div>
          </div>: (
          <div className={navbarStyles.navItems}>
            <Link href="/login" className={navbarStyles.navButton}>Login</Link>
            <Link href="/register" className={navbarStyles.navButton}>Register</Link>
          </div>
        )}
      </div>
    </div>

{openModal && 
  <div className={navbarStyles.navModal}>
    
    <div className={navbarStyles.nContainer}>
      <span  className={navbarStyles.nClose}
        onClick={() => setOpenModal(false)}>

      <FaXmark/>
      </span>
      <span>Select Hotel:</span>
      
       
          <select className={navbarStyles.hotelSelect} onChange={(e) => setHotelId(e.target.value)}>
            {data?.map(each => (

            <option value={each._id} key={each._id}>{each.name} {" "} {each.city}</option>
            ))}
          </select>
        
     
      <button onClick={handleReserve} className={navbarStyles.nButton}>
        Goto Reservation!
      </button>
    </div>
  </div>}
  </>
  );
};

export default Navbar;
