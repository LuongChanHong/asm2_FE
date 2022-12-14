import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import SearchItem from "../../components/searchItem/SearchItem";

import "./list.css";
import { post } from "../../utils/fetch";
import { useSelector } from "react-redux";

const List = () => {
  const [searchInfo, setSearchInfo] = useState(
    useSelector((state) => state.user.searchInfo)
  );

  const [hotels, setHotels] = useState([]);
  const [openDate, setOpenDate] = useState(false);

  const searchHotel = async () => {
    try {
      const response = await post("/search-hotels", searchInfo);
      // console.log("response:", response);
      if (response) {
        setHotels(response.data);
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect(() => {
    searchHotel();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={searchInfo.destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                new Date(searchInfo.date.startDate),
                "MM/dd/yyyy"
              )} to ${format(
                new Date(searchInfo.date.endDate),
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => (searchInfo.date = [item.selection])}
                  minDate={new Date()}
                  ranges={searchInfo.date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder="999"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={searchInfo.options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={searchInfo.options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={searchInfo.options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={searchHotel}>Search</button>
          </div>
          {/* <>{renderHotelsList(hotels)}</> */}
          <div className="listResult">
            {hotels.length == 0 ? (
              <h1>Loading ...</h1>
            ) : (
              hotels.map((item) => <SearchItem key={item._id} data={item} />)
            )}
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default List;
