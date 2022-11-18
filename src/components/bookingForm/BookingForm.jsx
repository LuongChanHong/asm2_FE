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
          {room.rooms.map((number, index) => (
            <form key={index} className="selectRoom__typeList--checkbox">
              <label htmlFor="">{number}</label>
              <input type="checkbox" />
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
  const [isInputClick, setInputClick] = useState({
    fullName: true,
    email: true,
    phoneNumber: true,
    identity: true,
  });
  const [userInfo, setUserInfo] = useState({});

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
    return { name: event.target.name, value: event.target.value };
  };

  const handleInputChange = (event) => {
    const target = handleEvent(event);
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const handleClick = (event) => {
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
              <label>Your Full Name:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.fullName}
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  onClick={handleClick}
                  placeholder="Full Name"
                />
                <button
                  onClick={(event) => handleClearInput("fullName", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <article
                className={`userInfo_form--warning ${
                  inputValid.fullName ? `hidden` : ``
                }`}
              >
                Name cannot contain number
              </article>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <label>Your Email:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.email}
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  onClick={handleClick}
                  placeholder="Email"
                />
                <button onClick={(event) => handleClearInput("email", event)}>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <article
                className={`userInfo_form--warning ${
                  inputValid.email ? `hidden` : ``
                }`}
              >
                error text
              </article>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <label>Your Phone Number:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.phoneNumber}
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  onClick={handleClick}
                  placeholder="Phone Number"
                />
                <button
                  onClick={(event) => handleClearInput("phoneNumber", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <article
                className={`userInfo_form--warning ${
                  inputValid.phoneNumber ? `hidden` : ``
                }`}
              >
                error text
              </article>
            </form>
            {/* form item */}
            {/* form item */}
            <form className="userInfo_form--item">
              <label>Your Identity Card Number:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.identity}
                  type="text"
                  name="identity"
                  onChange={handleInputChange}
                  onClick={handleClick}
                  placeholder="Card Number"
                />
                <button
                  onClick={(event) => handleClearInput("identity", event)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <article
                className={`userInfo_form--warning ${
                  inputValid.identity ? `hidden` : ``
                }`}
              >
                error text
              </article>
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
          <strong>Total Bill: $700</strong>
        </h4>
        <div className="finalCheck__wrapper">
          <select className="finalCheck__options">
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Credit Card">Cash</option>
          </select>
          <div className="finalCheck__button">
            <button>Reserve Now</button>
          </div>
        </div>
      </section>
    </section>
  );
};

// {/* Room type list */}
// <div className="selectRoom__typeList">
// {/* Room type item */}
// <div className="selectRoom__typeList--item">
//   <section className="selectRoom__typeList--detail">
//     <h6>Double Room</h6>
//     <span>Pay not thing until September 04,2022</span>
//     <span>
//       Max people:{" "}
//       <span>
//         <b>2</b>
//       </span>
//     </span>
//     <b>$350</b>
//   </section>
//   {/* Room checkboxs */}
//   <section className="selectRoom__typeList--rooms">
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">101</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">201</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">202</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">203</label>
//       <input type="checkbox" />
//     </form>
//   </section>
//   {/* Room checkboxs */}
// </div>
// {/* Room type item */}
// {/* Room type item */}
// <div className="selectRoom__typeList--item">
//   <section className="selectRoom__typeList--detail">
//     <h6>Double Room</h6>
//     <span>Pay not thing until September 04,2022</span>
//     <span>
//       Max people:{" "}
//       <span>
//         <b>2</b>
//       </span>
//     </span>
//     <b>$350</b>
//   </section>
//   {/* Room checkboxs */}
//   <section className="selectRoom__typeList--rooms">
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">101</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">201</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">202</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">203</label>
//       <input type="checkbox" />
//     </form>
//   </section>
//   {/* Room checkboxs */}
// </div>
// {/* Room type item */}
// {/* Room type item */}
// <div className="selectRoom__typeList--item">
//   <section className="selectRoom__typeList--detail">
//     <h6>Double Room</h6>
//     <span>Pay not thing until September 04,2022</span>
//     <span>
//       Max people:{" "}
//       <span>
//         <b>2</b>
//       </span>
//     </span>
//     <b>$350</b>
//   </section>
//   {/* Room checkboxs */}
//   <section className="selectRoom__typeList--rooms">
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">101</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">201</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">202</label>
//       <input type="checkbox" />
//     </form>
//     <form className="selectRoom__typeList--checkbox">
//       <label htmlFor="">203</label>
//       <input type="checkbox" />
//     </form>
//   </section>
//   {/* Room checkboxs */}
// </div>
// {/* Room type item */}
// </div>
// {/* Room type list */}

export default BookingForm;
