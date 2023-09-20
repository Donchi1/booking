import {
  FaBed,
  FaCalendarDays,
  FaCar,
  FaPlane,
  FaTaxi,
  FaPerson

} from "react-icons/fa6";
import headerStyles from "@/styles/Header.module.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useRouter } from "next/router"
import { SearchContext } from "@/context/SearchContext";
import { AuthContext } from "@/context/AuthContext";

type dateType = {
  startDate: Date;
  endDate: Date;
  key: string;
}[]

const Header = ({ type }: {type: string}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState<{adult: number,
  children: number,
  room: number}>({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useRouter();
  const { user } = useContext(AuthContext);


  const handleOption = (name: string, operation : string) => {
    setOptions((prev) => {
      return {
        ...prev,
        //@ts-ignore
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    const searchData = { destination, dates, options }
    dispatch({ type: "NEW_SEARCH", payload: searchData });
    localStorage.setItem("searchQuery",JSON.stringify(searchData) )
    navigate.push("/list")
  };

  return (
    <div className={headerStyles.header}>
      <div
        className={
          type === "list" || type === "bookings" ? `${headerStyles.headerContainer} ${headerStyles.listMode}` : `${headerStyles.headerContainer}`
        }
      >
        <div className={headerStyles.headerList}>
          <div className={`${headerStyles.headerListItem} ${headerStyles.active} `}>
            <FaBed />
            <span>Stays</span>
          </div>
          <div className={headerStyles.headerListItem}>
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className={headerStyles.headerListItem}>
            <FaCar />
            <span>Car rentals</span>
          </div>
          <div className={headerStyles.headerListItem}>
            <FaBed />
            <span>Attractions</span>
          </div>
          <div className={headerStyles.headerListItem}>
            <FaTaxi />
            <span>Airport taxis</span>
          </div>
        </div>
        
          <div style={{display:  type === "list" || type === "bookings" ? "none" : "block"}}>
            <h1 className={headerStyles.headerTitle}>
              A Special discounts for you? It is Real.
            </h1>
            <p className={headerStyles.headerDesc}>
              Grab rewards for your travels – unlock your special offer or
              more with a free donnybook account!
            </p>
            
            <div className={headerStyles.headerSearch}>
              <div className={headerStyles.headerInputContainer}>

              <div className={`${headerStyles.headerSearchItem} ${headerStyles.inputData}`}>
                <FaBed className={headerStyles.headerIcon} />
                <input
                  type="search"
                  placeholder="Where are you going?"
                  className={headerStyles.headerSearchInput}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              </div>
              <div className={headerStyles.headerInfoContainer}>

              <div className={`${headerStyles.headerSearchItem} ${headerStyles.chooseData}`} >
                <FaCalendarDays onClick={() => {
                    setOpenDate(!openDate)
                    setOpenOptions(false)
                  }} className={headerStyles.headerIcon} />
                <span
                  onClick={() => {
                    setOpenDate(!openDate)
                    setOpenOptions(false)
                  }}
                  className={headerStyles.headerSearchText}
                >{`${format(dates[0].startDate, "EE MMM d")} - ${format(
                  dates[0].endDate,
                  "EE MMM d"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item: any) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className={headerStyles.date}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className={`${headerStyles.headerSearchItem} ${headerStyles.chooseData}`}  >
                

                <FaPerson className={headerStyles.headerIcon}  onClick={() => {
                    setOpenDate(false)
                    setOpenOptions(!openOptions)
                  }} />
                <span
                 onClick={() => {
                  setOpenDate(false)
                  setOpenOptions(!openOptions)
                }}
                  className={headerStyles.headerSearchText}
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                
                {openOptions && (
                  <div className={headerStyles.options}>
                    <div className={headerStyles.optionItem}>
                      <span className={headerStyles.optionText}>Adult</span>
                      <div className={headerStyles.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className={headerStyles.optionCounterNumber}>
                          {options.adult}
                        </span>
                        <button
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={headerStyles.optionItem}>
                      <span className={headerStyles.optionText}>Children</span>
                      <div className={headerStyles.optionCounter}>
                        <button
                          disabled={options.children <= 0}
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className={headerStyles.optionCounterNumber}>
                          {options.children}
                        </span>
                        <button
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={headerStyles.optionItem}>
                      <span className={headerStyles.optionText}>Room</span>
                      <div className={headerStyles.optionCounter}>
                        <button
                          disabled={options.room <= 1}
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className={headerStyles.optionCounterNumber}>
                          {options.room}
                        </span>
                        <button
                          className={headerStyles.optionCounterButton}
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${headerStyles.headerSearchItem} ${headerStyles.chooseBtn}`}>
                <button className={headerStyles.headerBtn} onClick={handleSearch}>
                  Search
                </button>
              </div>
              </div>
            </div>
          </div>
     
      </div>
    </div>
  );
};

export default Header;
