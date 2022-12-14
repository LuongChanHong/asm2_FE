import { useNavigate } from "react-router-dom";

import "./searchItem.css";

const SearchItem = ({ data }) => {
  // console.log(data);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel/${data._id}`);
  };

  return (
    <div className="searchItem">
      <img src={data.photos[0]} alt={data.name} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{data.name}</h1>
        <span className="siDistance">{data.distance} from center</span>
        {/* <span className="siTaxiOp">{tag}</span> */}
        <span className="siSubtitle">{data.desc}</span>
        {/* <span className="siFeatures">{data.type}</span> */}

        {/* If can cancel */}
        {/* {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{data.rateText}</span>
          <button>{data.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button type="button" onClick={handleClick} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
