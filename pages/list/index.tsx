import listStyles from  "@/styles/List.module.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/loader";
import * as Icons from "react-icons/fa";
import Accord from "../../components/accord/Accord";
import { SearchContext } from "@/context/SearchContext";


// type LocalStoredType = {
//   destination: string | undefined,
//   dates: [{endDate: Date, startDate: Date}] | any,
//   options: {
//     adult: number | string ,
//     children: number | string,
//     room: number | string,
//   },
// }

// export const getLocalStoredQuery = () => {
//   let storedSearchInfo:LocalStoredType = JSON.parse(localStorage.getItem("searchQuery") as string)
//   const destination = storedSearchInfo.dates[0].destination
//   const options = storedSearchInfo.dates[0].options 
  
//    return {
//     dates:[{
//       startDate: new Date(storedSearchInfo.dates[0].startDate),
//       endDate: new Date(storedSearchInfo.dates[0].endDate)
//     }
//     ],
//     options,
//     destination
//    }
// }

const List = () => {

  const {destination, dates,options} = useContext(SearchContext)



  

  const [myDestination, setDestination] = useState<string | undefined>(destination);

  const [myDates, setDates] = useState<{
    endDate: Date;
    startDate: Date;
     }[] | any>(dates);
     console.log(myDates)

  const [openDate, setOpenDate] = useState(false);
  const [myOptions, setOptions] = useState(options);
  const [min, setMin] = useState<string | undefined>(undefined);
  const [max, setMax] = useState<string | undefined>(undefined);

  const { data, loading, reFetch } = useFetch(
    `/api/routes/hotels/getHotels?city=${myDestination}&min=${min || 1}&max=${max || 10000}`
  );



  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <Accord title="Hotels" />
      <div className={listStyles.listContainer}>
        <div className={listStyles.listWrapper}>
          <div className={listStyles.listSearch}>
            <h1 className={listStyles.lsTitle}>Search</h1>
            <div className={listStyles.lsItem}>
              <label>Destination</label>
              <span className={listStyles.searchIco}>
                <Icons.FaSearch size={25} color="#3e3e3e"  />
              <input className={listStyles.destination} 
              value={destination} placeholder="Enter Destination " 
              type="text" onChange={(e) =>setDestination(e.target.value )}  />
              </span>
            </div>
            <div className={listStyles.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                <Icons.FaCalendarAlt
                  className={listStyles.calender}
                  color="#3e3e3e"
                  size={25}
                />
                {format(myDates[0].startDate , "EEEE, MMMM d, yyyy")}
              </span>
              <label>Check-out Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                <Icons.FaCalendarAlt
                  className={listStyles.calender}
                  color="#3e3e3e"
                  size={25}
                />
                {format(myDates[0].endDate, "EEEE, MMMM d, yyyy")}
              </span>

              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.range1])}
                  minDate={new Date()}
                  ranges={myDates}
                  className={listStyles.myDateRange}
                />
              )}
            </div>
            <div className={listStyles.lsItem}>
             
              <div className={listStyles.lsOptions}>
                <div className={listStyles.lsOptionItem}>
                  <span className={listStyles.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={listStyles.lsOptionInput}
                  />
                </div>
                <div className={listStyles.lsOptionItem}>
                  <span className={listStyles.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={listStyles.lsOptionInput}
                  />
                </div>
                <div className={listStyles.lsOptionItem}>
                  <span className={listStyles.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={listStyles.lsOptionInput}
                    placeholder={myOptions?.adult.toString()}
                  />
                </div>
                <div className={listStyles.lsOptionItem}>
                  <span className={listStyles.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={listStyles.lsOptionInput}
                    placeholder={myOptions?.children.toString()}
                  />
                </div>
                <div className={listStyles.lsOptionItem}>
                  <span className={listStyles.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={listStyles.lsOptionInput}
                    placeholder={myOptions?.room.toString()}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className={listStyles.listResult}>
            {loading ? (
              <Loader />
            ) : (
              <>
                {data?.map((item: any) => (
                  <SearchItem item={item} key={item._id} dates={myDates} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
