import { useState, useEffect } from "react";

import "./featuredProperties.css";

import { get } from "../../utils/fetch";

const renderPropertiItem = (item) => {
  return (
    <div key={item._id} className="fpItem">
      <img src={item.photos[2]} alt={item.name} className="fpImg" />
      <span className="fpName">
        <a href="" target="_blank">
          {item.name}
        </a>
      </span>
      <span className="fpCity">{item.city}</span>
      <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
      {/* <div className="fpRating">
        <button>8.9</button>
        <span>Excellent</span>
      </div> */}
    </div>
  );
};

const renderPropertiList = (list) => {
  if (list.length > 0) {
    return (
      <div className="fp">{list.map((item) => renderPropertiItem(item))}</div>
    );
  } else {
    <h1>No hotel found</h1>;
  }
};

const FeaturedProperties = () => {
  const [ratingHotels, setRatingHotels] = useState([]);

  useEffect(() => {
    get("/get-hotels-by-area")
      .then((result) => result.json())
      .then((data) => {
        // console.log("data:", data);
        setRatingHotels(data.hotelByRating);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return <div className="fp">{renderPropertiList(ratingHotels)}</div>;
};

export default FeaturedProperties;
