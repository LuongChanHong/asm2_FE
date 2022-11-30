import { useState, useEffect } from "react";
import "./featured.css";

import { get } from "../../utils/fetch";

const renderFeaturedItem = (item) => {
  return (
    <div key={item.cityName} className="featuredItem">
      <img src={item.imageUrl} alt="" className="featuredImg" />
      <div className="featuredTitles">
        <h1>{item.cityName}</h1>
        <h2>{item.quantity} properties</h2>
      </div>
    </div>
  );
};

const renderFeaturedList = (list) => {
  if (list.length > 0) {
    return (
      <div className="featured">
        {list.map((item) => renderFeaturedItem(item))}
      </div>
    );
  } else {
    <h1>No hotel found</h1>;
  }
};

const Featured = () => {
  const [hotelByCity, setHotelByCity] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await get("/get-hotels-by-area");
        // console.log(response);
        setHotelByCity(response.data.hotelByCity);
      } catch (err) {
        console.log("err:", err);
      }
    };
    getData();
  }, []);

  return (
    <section className="featured">
      {hotelByCity ? (
        <>{renderFeaturedList(hotelByCity)}</>
      ) : (
        <h5>Loading...</h5>
      )}
    </section>
  );
};

export default Featured;
