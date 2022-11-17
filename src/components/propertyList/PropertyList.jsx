import { useState, useEffect } from "react";
import "./propertyList.css";

import { get } from "../../utils/fetch";

const renderPropertytem = (item) => {
  return (
    <div key={item.type} className="pListItem">
      <img src={item.imageUrl} alt={item.type} className="pListImg" />
      <div className="pListTitles">
        <h1>{item.type}</h1>
        <h2>
          {item.quantity} {item.type}s
        </h2>
      </div>
    </div>
  );
};

const renderPropertyList = (list) => {
  if (list.length > 0) {
    return (
      <div className="pList">{list.map((item) => renderPropertytem(item))}</div>
    );
  } else {
    <h1>No hotel found</h1>;
  }
};

const PropertyList = () => {
  const [property, setProperty] = useState([]);

  useEffect(() => {
    get("/get-hotels-by-area")
      .then((result) => result.json())
      .then((data) => {
        // console.log("data.propertyByType:", data.propertyByType);
        setProperty(data.propertyByType);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return <div className="pList">{renderPropertyList(property)}</div>;
};

export default PropertyList;
