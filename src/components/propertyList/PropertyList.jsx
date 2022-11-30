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
    const getData = async () => {
      try {
        const response = await get("/get-hotels-by-area");
        setProperty(response.data.propertyByType);
      } catch (err) {
        console.log("err:", err);
      }
    };
    getData();
  }, []);

  return (
    <div className="pList">
      {property ? <>{renderPropertyList(property)}</> : <h5>Loading...</h5>}
    </div>
  );
};

export default PropertyList;
