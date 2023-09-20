import useFetch from "../../hooks/useFetch";
import featureStyles from  "@/styles/Featured.module.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/routes/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className={featureStyles.featured}>
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className={featureStyles.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className={featureStyles.featuredImg}
            />
            <div className={featureStyles.featuredTitles}>
              <h1>Berlin</h1>
              <h2>{data && data[0]} properties</h2>
            </div>
          </div>

          <div className={featureStyles.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className={featureStyles.featuredImg}
            />
            <div className={featureStyles.featuredTitles}>
              <h1>Madrid</h1>
              <h2>{data && data[1]} properties</h2>
            </div>
          </div>
          <div className={featureStyles.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className={featureStyles.featuredImg}
            />
            <div className={featureStyles.featuredTitles}>
              <h1>London</h1>
              <h2>{data && data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
