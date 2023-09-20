import useFetch from "../../hooks/useFetch";
import featureProps from "@/styles/FeaturedProperties.module.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/routes/hotels/getHotels?featured=true&limit=4");

  return (
    <div className={featureProps.fp}>
      {loading ? (
        "Loading"
      ) : (
        <>
          {data?.map((item: any) => (
            <div className={featureProps.fpItem} key={item._id }>
              <img
                src={item.photos[0]}
                alt=""
                className={featureProps.fpImg}
              />
              <span className={featureProps.fpName}>{item.name}</span>
              <span className={featureProps.fpCity}>{item.city}</span>
              <span className={featureProps.fpPrice}>Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className={featureProps.fpRating}>
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
