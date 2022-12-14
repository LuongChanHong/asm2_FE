import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./header.css";

import { inputSearchAction } from "../../redux/actions/userAction";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("Ho Chi Minh");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [errorDate, setErrorDate] = useState(false);
  const [hotels, setHotels] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleInputOnClick = (inputName) => {
    switch (inputName) {
      case "destination":
        setOpenDate(false);
        setOpenOptions(false);
        break;
      case "date":
        setOpenDate(!openDate);
        setOpenOptions(false);
        setErrorDate(false);
        break;
      case "person":
        setOpenOptions(!openOptions);
        setOpenDate(false);
        break;
    }
  };

  const handleSearch = () => {
    setOpenDate(false);
    setOpenOptions(false);

    // convert date object to number then compare
    if (date[0].startDate.getTime() === date[0].endDate.getTime()) {
      setErrorDate(true);
    } else {
      dispatch(
        inputSearchAction({
          date: date[0],
          destination: destination,
          options: options,
        })
      );
      navigate(`/hotels`);
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" || location.pathname == "/dashboard"
            ? "headerContainer listMode"
            : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {(type === "list" || location.pathname != "/dashboard") && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free account
            </p>
            <button className="headerBtn">Sign in / Register</button>
            {/* =========================== */}
            {/* SEARCH COMPONENT */}
            {/* =========================== */}
            <div className="headerSearch">
              {/* destination input*/}
              <section className="headerSearchWrap">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <select
                    className="headerSearch__select"
                    onChange={(e) => setDestination(e.target.value)}
                    onClick={() => handleInputOnClick("destination")}
                  >
                    <option value="Ho Chi Minh">Hồ Chí Minh</option>
                    <option value="Da Nang">Đà Nẵng</option>
                    <option value="Ha Noi">Hà Nội</option>
                  </select>
                </div>
              </section>
              {/* date input*/}
              <section className="headerSearchWrap">
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                  />
                  <span
                    onClick={() => handleInputOnClick("date")}
                    className="headerSearchText"
                  >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                {errorDate ? (
                  <span className="searchWanring">date error</span>
                ) : (
                  <></>
                )}
              </section>
              {/* person input */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => handleInputOnClick("person")}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  // option list
                  <div className="options">
                    {/* option item */}
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* option item */}
                    {/* option item */}
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* option item */}
                    {/* option item */}
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* option item */}
                  </div>
                )}
              </div>
              {/* search button */}
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
