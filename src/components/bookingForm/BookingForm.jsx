import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { post } from "../../utils/fetch";

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
  const [emptyRooms, setEmptyRooms] = useState([]);
  const [inputValid, setInputValid] = useState({
    fullName: true,
    email: true,
    phoneNumber: true,
    identity: true,
  });
  const [bookedRooms, setBookedRooms] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [payMethod, setPayMethod] = useState("");
  let [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.currentUser);
    post("/find-user-by-email", userEmail)
      .then((result) => result.json())
      .then((user) => {
        // console.log("user:", user);
        // setCurrentUser(user);
        setUserInfo(user);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    if (endDate.getTime() != startDate.getTime()) {
      post("/get-rooms-by-date", { date: date, hotel: props.hotel })
        .then((result) => result.json())
        .then((rooms) => {
          console.log("rooms:", rooms);
          setEmptyRooms(rooms);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  }, [date]);

  const handleEvent = (event) => {
    // console.log("event:", event.target.value);
    return {
      name: event.target.name,
      value: event.target.value,
      checked: event.target.checked,
    };
  };

  const calTotalPrice = (price, isBookingMore) => {
    const { startDate, endDate } = date[0];
    const bookingDays = endDate.getUTCDate() - startDate.getUTCDate() + 1;
    if (isBookingMore) {
      totalPrice += price * bookingDays;
    } else {
      totalPrice -= price * bookingDays;
    }
    setTotalPrice(totalPrice);
  };

  // Add picking room to list and calculate total bill
  const handleRoomPicking = (event, id, price) => {
    const { name, checked } = handleEvent(event);
    const _bookedRooms = [...bookedRooms];

    if (checked) {
      _bookedRooms.push({ roomId: id, roomNumber: name });
      calTotalPrice(price, checked);
    } else {
      _bookedRooms.forEach((room, index) => {
        if (room.roomId === id && room.roomNumber === name) {
          _bookedRooms.splice(index, 1);
          calTotalPrice(price, checked);
        }
      });
    }
    setBookedRooms(_bookedRooms);
  };

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
            {room.rooms.map((number, i) => (
              <form key={i} className="selectRoom__typeList--checkbox">
                <label htmlFor="">{number}</label>
                <input
                  name={number}
                  type="checkbox"
                  onChange={(event) =>
                    handleRoomPicking(event, room.roomId, room.price)
                  }
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

  // Validation is any number in string
  const textValidation = (text) => {
    // const regular = /^[a-zA-Z]*$/;
    // const space = /^\s+$/;
    let flag = true;
    const charList = text.split("");
    charList.forEach((char) => {
      const parsedChar = parseInt(char);
      if (parsedChar == char) {
        flag = false;
      }
    });
    return flag;
  };

  // Validation is value is number
  const numberValidation = (number, digitNumbers) => {
    const regular = /^[0-9]+$/;
    if (regular.test(number) && number.length === digitNumbers) {
      return true;
    } else {
      return false;
    }
  };

  //
  const emailValidation = (email) => {
    const regular =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regular.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = (event) => {
    const target = handleEvent(event);
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const handlePayMethod = (event) => {
    const { value } = handleEvent(event);
    if (value === "Credit Card" || value === "Cash") {
      setPayMethod(value);
    }
  };

  const handleInputValid = (event) => {
    const { name } = handleEvent(event);
    let isValid = {
      fullName: true,
      email: true,
      phoneNumber: true,
      identity: true,
    };
    switch (name) {
      case "fullName":
        isValid.email = emailValidation(userInfo.email);
        isValid.phoneNumber = numberValidation(
          userInfo.phoneNumber,
          PHONE_DIGIT
        );
        isValid.identity = numberValidation(userInfo.identity, IDENTITY_DIGIT);
        break;
      case "email":
        isValid.fullName = textValidation(userInfo.fullName);
        isValid.phoneNumber = numberValidation(
          userInfo.phoneNumber,
          PHONE_DIGIT
        );
        isValid.identity = numberValidation(userInfo.identity, IDENTITY_DIGIT);
        break;
      case "phoneNumber":
        isValid.email = emailValidation(userInfo.email);
        isValid.fullName = textValidation(userInfo.fullName);
        isValid.identity = numberValidation(userInfo.identity, IDENTITY_DIGIT);
        break;
      case "identity":
        isValid.email = emailValidation(userInfo.email);
        isValid.fullName = textValidation(userInfo.fullName);
        isValid.phoneNumber = numberValidation(
          userInfo.phoneNumber,
          PHONE_DIGIT
        );
        break;
    }
    setInputValid(isValid);
  };

  const handleClearInput = (inputName, event) => {
    event.preventDefault();
    setUserInfo({ ...userInfo, [inputName]: "" });
  };

  const reserveFinalCheck = () => {
    // console.log("run");
    const { startDate, endDate } = date[0];
    if (startDate.getDate() === endDate.getDate()) {
      return false;
    }
    const { fullName, email, identity, phoneNumber } = userInfo;
    const _inputValid = { ...inputValid };

    _inputValid.fullName = textValidation(fullName) ? true : false;
    _inputValid.email = emailValidation(email) ? true : false;
    _inputValid.identity = numberValidation(identity, IDENTITY_DIGIT)
      ? true
      : false;
    _inputValid.phoneNumber = numberValidation(phoneNumber, PHONE_DIGIT)
      ? true
      : false;
    setInputValid(_inputValid);
    if (
      _inputValid.fullName === false ||
      _inputValid.email === false ||
      _inputValid.identity === false ||
      _inputValid.phoneNumber === false
    ) {
      return false;
    }
  };

  const handleReserve = () => {
    const reserveData = {
      user: userInfo,
      hotel: props.hotel._id,
      rooms: bookedRooms,
      date: date,
      price: totalPrice,
      payment: payMethod,
    };
    const value = reserveFinalCheck();
    console.log(value);
    // post("/create-transaction", reserveData)
    //   .then((result) => result.json())
    //   .then((data) => {
    //     console.log("data:", data);
    //   })
    //   .catch((err) => console.log("err:", err));
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
              onChange={(item) => setDate([item.selection])}
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
                {inputValid.fullName ? (
                  <label>Your Full Name:</label>
                ) : (
                  <article className="text-danger">
                    Name cannot contain number
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  inputValid.fullName ? `` : `border border-danger`
                }`}
              >
                <input
                  value={userInfo.fullName}
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  onClick={handleInputValid}
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
                {inputValid.email ? (
                  <label>Your Email:</label>
                ) : (
                  <article className="text-danger">Invalid email</article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  inputValid.email ? `` : `border border-danger`
                }`}
              >
                <input
                  value={userInfo.email}
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  onClick={handleInputValid}
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
                {inputValid.phoneNumber ? (
                  <label>Your Phone Number:</label>
                ) : (
                  <article className="text-danger">
                    Phone number must have 10 number digits
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  inputValid.phoneNumber ? `` : `border border-danger`
                }`}
              >
                <input
                  value={userInfo.phoneNumber}
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  onClick={handleInputValid}
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
                {inputValid.identity ? (
                  <label>Your Identity Card Number:</label>
                ) : (
                  <article className="text-danger">
                    Identity number must have 12 number digits
                  </article>
                )}
              </>
              <div
                className={`userInfo_form--input ${
                  inputValid.identity ? `` : `border border-danger`
                }`}
              >
                <input
                  value={userInfo.identity}
                  type="text"
                  name="identity"
                  onChange={handleInputChange}
                  onClick={handleInputValid}
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
        {emptyRooms.length > 0 ? renderAvailableRooms(emptyRooms) : <></>}
      </section>
      {/* PAYMENT AND RESERVATION */}
      <section className="finalCheck">
        <h4 className="bookingInfo__title">
          <strong>Total Bill: ${totalPrice}</strong>
        </h4>
        <div className="finalCheck__wrapper">
          <select onChange={handlePayMethod} className="finalCheck__options">
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <div className="finalCheck__button">
            <button onClick={handleReserve}>Reserve Now</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BookingForm;
