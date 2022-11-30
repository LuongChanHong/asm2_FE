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

const renderHotelsList = (list) => {
  // console.log("list:", list);
  if (list.length > 0) {
    return (
      <div className="listResult">
        {list.map((item) => (
          <SearchItem key={item._id} data={item} />
        ))}
      </div>
    );
  } else {
    <h1>No hotel found</h1>;
  }
};

const List = () => {
  // const location = useLocation();

  const [date, setDate] = useState();
  const [destination, setDestination] = useState();
  const [options, setOptions] = useState();

  const [hotels, setHotels] = useState([]);
  const [openDate, setOpenDate] = useState(false);

  console.log(date);
  // console.log(destination);
  // console.log(options);

  useEffect(() => {
    // console.log("run");

    const searchHotel = async () => {
      try {
        const response = await post("/search-hotels", {
          destination,
          date,
          options,
        });
        console.log("response:", response.data);
        setHotels(response.data);
      } catch (err) {
        console.log("err:", err);
      }
    };
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
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => (date = [item.selection])}
                  minDate={new Date()}
                  ranges={date}
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
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <>{renderHotelsList(hotels)}</>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default List;
