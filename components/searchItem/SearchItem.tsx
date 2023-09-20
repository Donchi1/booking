import { useContext } from "react";
import  Link  from "next/link";
import { SearchContext } from "../../context/SearchContext";
import searchStyles from "@/styles/SearchItem.module.css";

const SearchItem = ({ item , dates }: {item: any, dates: any}) => {

  const { dispatch } = useContext(SearchContext);
  
  localStorage.setItem("dates",JSON.stringify(dates))

  const handleDateChange = () => {

    dispatch({type:"CHANGE_DATE", payload: dates})

  } 

  return (
    <div className={searchStyles.searchItem}>
      <img src={item.photos[0]} alt="" className={searchStyles.siImg} />
      <div className={searchStyles.siDesc}>
        <h1 className={searchStyles.siTitle}>{item.name}</h1>
        <span className={searchStyles.siDistance}>{item.distance}m from center</span>
        <span className={searchStyles.siTaxiOp}>Free airport taxi</span>
        <span className={searchStyles.siSubtitle}>
          Studio Apartment with Air conditioning
        </span>
        <span className={searchStyles.siFeatures}>{item.desc}</span>
        <span className={searchStyles.siCancelOp}>Free cancellation </span>
        <span className={searchStyles.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={searchStyles.siDetails}>
        {item.rating && <div className={searchStyles.siRating}>
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className={searchStyles.siDetailTexts}>
          <span className={searchStyles.siPrice}>${item.cheapestPrice}</span>
          <span className={searchStyles.siTaxOp}>Includes taxes and fees</span>
          <Link href={`/hotels/${item._id}`} onClick={handleDateChange}>
          <button className={searchStyles.siCheckButton}>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
