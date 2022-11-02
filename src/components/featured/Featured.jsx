import { useState, useEffect } from "react";
import "./featured.css";

import { serverPath } from "../../utils/path";

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
    fetch(serverPath + "/get-hotels-by-area")
      .then((result) => result.json())
      .then((data) => {
        // console.log("data.hotelByCity:", data.hotelByCity);
        setHotelByCity(data.hotelByCity);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return (
    <section className="featured">{renderFeaturedList(hotelByCity)}</section>
  );
};

export default Featured;
