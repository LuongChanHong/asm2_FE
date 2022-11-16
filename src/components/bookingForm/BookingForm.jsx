import React from "react";
import { useState, useEffect } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { serverPath } from "../../utils/path";
import "./bookingForm.css";

const renderRoomItem = (room) => {
  return (
    <div className="selectRoom__typeList--item">
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
          {room.rooms.map((number) => (
            <form className="selectRoom__typeList--checkbox">
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
      {roomList.map((room) => renderRoomItem(room))}
    </div>
  );
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
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userEmail = localStorage.currentUser;
    const fetchCurrentUser = () =>
      fetch(serverPath + "/find-user-by-email", {
        method: "POST",
        body: userEmail,
        headers: { "Content-type": "application/json" },
        credentials: "same-origin",
      })
        .then((result) => result.json())
        .then((data) => {
          // console.log("data:", data);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;

    const fetchRoomsByDate = () => {
      fetch(serverPath + "/get-rooms-by-date", {
        method: "POST",
        body: JSON.stringify({ date: date, hotel: props.hotel }),
        headers: { "Content-type": "application/json" },
        credentials: "same-origin",
      })
        .then((result) => result.json())
        .then((data) => {
          // console.log("data:", data);
          setEmptyRooms(data);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    };

    if (endDate.getTime() != startDate.getTime()) {
      fetchRoomsByDate();
    }
  }, [date]);

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
            <form className="userInfo_form--item">
              <label>Your Full Name:</label>
              <input
                value={currentUser.fullName}
                type="text"
                placeholder="Full Name"
              />
            </form>
            <form className="userInfo_form--item">
              <label>Your Email:</label>
              <input
                value={currentUser.email}
                type="email"
                placeholder="Email"
              />
            </form>
            <form className="userInfo_form--item">
              <label>Your Phone Number:</label>
              <input
                value={currentUser.phoneNumber}
                type="text"
                placeholder="Phone Number"
              />
            </form>
            <form className="userInfo_form--item">
              <label>Your Identity Card Number:</label>
              <input
                value={currentUser.identity}
                type="text"
                placeholder="Card Number"
              />
            </form>
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
