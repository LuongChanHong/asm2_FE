import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, getDate } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { get, post } from "../../utils/fetch";

import "./bookingForm.css";

const PHONE_DIGIT = 10;
const IDENTITY_DIGIT = 12;

const BookingForm = (props) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [datesInRange, setDatesInRange] = useState([]);

  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomsOfHotel, setRoomsOfHotel] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isInputValid, setInputValid] = useState({
    fullName: true,
    email: true,
    phoneNumber: true,
    identity: true,
  });
  const [isDateValid, setDateValid] = useState(true);
  const [isRenderError, setRenderError] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  let [totalPrice, setTotalPrice] = useState(0);

  const user = useSelector((state) => state.user.loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const getRoomsOfHotel = async () => {
      const result = await get("/get-rooms-of-hotel/", props.hotel._id);
      // console.log(result);
      setRoomsOfHotel(result.data);
    };
    // calculate date range
    const getDatesInRange = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());

      const dates = [];

      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }

      setDatesInRange(dates);
    };
    // getRoomsOfHotel();
    if (endDate.getTime() != startDate.getTime()) {
      getRoomsOfHotel();
      getDatesInRange();
      console.log(roomsOfHotel);
    }
  }, [date]);

  const handleEvent = (event) => {
    // console.log("event:", event.target);
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        value: target.value,
        checked: target.checked,
      };
    } else {
      return {
        name: target.name,
        value: target.value,
      };
    }
  };

  const calTotalPrice = (price, isBookingMore) => {
    const bookingDays = datesInRange.length;
    if (isBookingMore) {
      totalPrice += price * bookingDays;
    } else {
      totalPrice -= price * bookingDays;
    }
    setTotalPrice(totalPrice);
  };

  const isAvailable = (room) => {
    const isFound = room.unAvailableDates.some((date) =>
      datesInRange.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  // Add picking room to list and calculate total bill
  const handleRoomPicking = (event, price) => {
    const { value, checked } = handleEvent(event);
    setBookedRooms(
      checked
        ? [...bookedRooms, value]
        : bookedRooms.filter((item) => item !== value)
    );
    calTotalPrice(price, checked);
  };

  // --------------------------------------
  // RENDER FUNCTION
  // --------------------------------------
  const renderRoomItem = (room, index) => {
    return (
      <div key={index} className="selectRoom__typeList--item">
        <div className="selectRoom__typeList--wrapper">
          <section className="selectRoom__typeList--detail">
            <h6>
              <b>{room.title}</b>
            </h6>
            <span className="selectRoom__typeList--desc">{room.desc}</span>
            <div className="selectRoom__typeList--bottom">
              <span>
                <b> Max people: {room.maxPeople}</b>
              </span>
              <b>${room.price}</b>
            </div>
          </section>
          {/* Room checkboxs */}
          <section className="selectRoom__typeList--rooms">
            {room.roomNumbers.map((item, i) => (
              <form key={i} className="selectRoom__typeList--checkbox">
                <label htmlFor="">{item.number}</label>
                <input
                  name={item.number}
                  type="checkbox"
                  value={item._id}
                  onChange={(event) => handleRoomPicking(event, room.price)}
                  disabled={!isAvailable(item)}
                />
              </form>
            ))}
          </section>
          {/* Room checkboxs */}
        </div>
      </div>
    );
  };

  const renderAvailableRooms = (roomList) => {
    return (
      <div className="selectRoom__typeList">
        {roomList.map((room, index) => renderRoomItem(room, index))}
      </div>
    );
  };

  const renderAllInputError = () => {
    let isAllInputValid =
      isInputValid.fullName &&
      isInputValid.email &&
      isInputValid.identity &&
      isInputValid.phoneNumber;
    return isRenderError ? (
      <section
        className={`finalCheck__error errorBorder ${
          isDateValid &&
          isAllInputValid &&
          payMethod !== "" &&
          bookedRooms.length !== 0
            ? `hidden`
            : ``
        }`}
      >
        {isDateValid ? <></> : <p className="errorText">Invalid date</p>}
        {isAllInputValid ? (
          <></>
        ) : (
          <p className="errorText">Invalid info form detail</p>
        )}
        {payMethod === "" ? (
          <p className="errorText">Please choose a payment method</p>
        ) : (
          <></>
        )}
        {bookedRooms.length === 0 ? (
          <p className="errorText">Please select a room</p>
        ) : (
          <></>
        )}
      </section>
    ) : (
      <></>
    );
  };
  // --------------------------------------
  // RENDER FUNCTION
  // --------------------------------------

  // --------------------------------------
  // VALIDATION FUNCTION
  // --------------------------------------
  const textValidation = (text, name) => {
    // const regular = /^[a-zA-Z]*$/;
    // const space = /^\s+$/;
    let isValid = true;
    if (text === "") {
      isValid = false;
    } else {
      const charList = text.split("");
      charList.forEach((char) => {
        const parsedChar = parseInt(char);
        if (parsedChar == char) {
          isValid = false;
        }
      });
    }
    setInputValid({ ...isInputValid, [name]: isValid });
    return isValid;
  };

  const numberValidation = (number, name, digitNumbers) => {
    let isValid;
    if (number != "") {
      const regular = /^[0-9]+$/;
      if (regular.test(number) && number.length === digitNumbers) {
        isValid = true;
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    setInputValid({ ...isInputValid, [name]: isValid });
    return isValid;
  };

  const emailValidation = (email, name) => {
    let isValid;
    if (email != "") {
      const regular =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regular.test(email)) {
        isValid = true;
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    setInputValid({ ...isInputValid, [name]: isValid });
    return isValid;
  };
  // --------------------------------------
  // VALIDATION FUNCTION
  // --------------------------------------

  // --------------------------------------
  // HANDLE INPUT FUNCTION
  // --------------------------------------
  const handleInputValid = (name, value) => {
    switch (name) {
      case "email":
        emailValidation(value, name);
        break;
      case "fullName":
        textValidation(value, name);
        break;
      case "identity":
        numberValidation(value, name, IDENTITY_DIGIT);
        break;
      case "phoneNumber":
        numberValidation(value, name, PHONE_DIGIT);
        break;
    }
  };

  const handleInputChange = (event) => {
    const target = handleEvent(event);
    setUserInfo({ ...userInfo, [target.name]: target.value });
    handleInputValid(target.name, target.value);
  };

  const handleDateChange = (item) => {
    setDate([item.selection]);
    const { startDate, endDate } = date[0];
    if (startDate.getUTCDate() !== endDate.getUTCDate()) {
      setDateValid(false);
    } else {
      setDateValid(true);
    }
  };

  const handlePayMethod = (event) => {
    const { value } = handleEvent(event);
    setPayMethod(value);
  };

  const handleClearInput = (inputName, event) => {
    event.preventDefault();
    setUserInfo({ ...userInfo, [inputName]: "" });
  };
  // --------------------------------------
  // HANDLE INPUT FUNCTION
  // --------------------------------------

  const reserveFinalCheck = () => {
    let flag = true;
    const { startDate, endDate } = date[0];
    flag &= startDate.getUTCDate() === endDate.getUTCDate() ? false : true;
    setDateValid(flag);

    const _isInputValid = { ...isInputValid };

    _isInputValid.fullName = textValidation(userInfo.fullName, "fullName")
      ? true
      : false;

    _isInputValid.email = emailValidation(userInfo.email, "email")
      ? true
      : false;

    _isInputValid.identity = numberValidation(
      userInfo.identity,
      "identity",
      IDENTITY_DIGIT
    )
      ? true
      : false;

    _isInputValid.phoneNumber = numberValidation(
      userInfo.phoneNumber,
      "phoneNumber",
      PHONE_DIGIT
    )
      ? true
      : false;

    setInputValid(_isInputValid);

    if (
      _isInputValid.fullName === false ||
      _isInputValid.email === false ||
      _isInputValid.identity === false ||
      _isInputValid.phoneNumber === false
    ) {
      flag &= false;
    } else {
      flag &= true;
    }

    flag &= payMethod === "" ? false : true;

    return flag;
  };

  const handleReserve = async () => {
    const isAllValid = reserveFinalCheck();
    setRenderError(!isAllValid);
    const reserveData = {
      user: userInfo,
      hotel: props.hotel._id,
      rooms: bookedRooms,
      dates: datesInRange,
      price: totalPrice,
      payment: payMethod,
    };
    try {
      await post("/reserve", reserveData);
      if (window.confirm("đặt phòng thàng công")) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <section className="bookingContainer">
      {/* INPUT FORM INFO */}
      <section className="bookingInfo">
        {/* Date picking calendar */}
        <section className="datePick">
          <div className="datePick__wrapper">
            <h4 className="bookingInfo__title">
              <strong>Dates</strong>
            </h4>
            {/* <span className="headerSearchText">{`${format(
              date[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span> */}
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDateChange(item)}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date datePick__calendar"
              minDate={new Date()}
            />
          </div>
        </section>
        {/* Date picking calendar */}
        {/* User info form */}
        <section className="userInfo">
          <h4 className="bookingInfo__title">
            <strong>Reserve Info</strong>
          </h4>
          <div className="userInfo_form">
            {/* form item */}
            <form className="userInfo_form--item">
              <>
                {isInputValid.fullName ? (
                  <label>Your Full Name:</label>
                ) : (
                  <article className="errorText">
                    Name can't contain numbers or be blank
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  isInputValid.fullName ? `` : `errorBorder`
                }`}
              >
                <input
                  value={userInfo.fullName}
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
                <button
                  onClick={(event) => handleClearInput("fullName", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <>
                {isInputValid.email ? (
                  <label>Your Email:</label>
                ) : (
                  <article className="errorText">Invalid email</article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  isInputValid.email ? `` : `errorBorder`
                }`}
              >
                <input
                  value={userInfo.email}
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <button onClick={(event) => handleClearInput("email", event)}>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <>
                {isInputValid.phoneNumber ? (
                  <label>Your Phone Number:</label>
                ) : (
                  <article className="errorText">
                    Phone number must have 10 number digits
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  isInputValid.phoneNumber ? `` : `errorBorder`
                }`}
              >
                <input
                  value={userInfo.phoneNumber}
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
                <button
                  onClick={(event) => handleClearInput("phoneNumber", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <>
                {isInputValid.identity ? (
                  <label>Your Identity Card Number:</label>
                ) : (
                  <article className="errorText">
                    Identity number must have 12 number digits
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  isInputValid.identity ? `` : `errorBorder`
                }`}
              >
                <input
                  value={userInfo.identity}
                  type="text"
                  name="identity"
                  onChange={handleInputChange}
                  placeholder="Card Number"
                />
                <button
                  onClick={(event) => handleClearInput("identity", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </form>
            {/* form item */}
          </div>
        </section>
        {/* User info form */}
      </section>
      {/* SECLECT ROOMS */}
      <section className="selectRoom">
        <h4 className="bookingInfo__title">
          <strong>Select Room</strong>
        </h4>
        {roomsOfHotel.length > 0 ? renderAvailableRooms(roomsOfHotel) : <></>}
      </section>
      {/* PAYMENT AND RESERVATION */}
      <section className="finalCheck">
        <h4 className="bookingInfo__title">
          <strong>Total Bill: ${totalPrice}</strong>
        </h4>
        <section className="finalCheck__wrapper">
          <select onChange={handlePayMethod} className="finalCheck__options">
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <div className="finalCheck__button">
            <button onClick={handleReserve}>Reserve Now</button>
          </div>
          {renderAllInputError()}
        </section>
      </section>
    </section>
  );
};

export default BookingForm;
