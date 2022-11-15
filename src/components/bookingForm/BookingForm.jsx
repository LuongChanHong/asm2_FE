import React from "react";
import { useState } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "./bookingForm.css";

const BookingForm = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
              <input type="text" placeholder="Full Name" />
            </form>
            <form className="userInfo_form--item">
              <label>Your Email:</label>
              <input type="text" placeholder="Email" />
            </form>
            <form className="userInfo_form--item">
              <label>Your Phone Number:</label>
              <input type="text" placeholder="Phone Number" />
            </form>
            <form className="userInfo_form--item">
              <label>Your Identity Card Number:</label>
              <input type="text" placeholder="Card Number" />
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
        {/* Room type list */}
        <div className="selectRoom__typeList">
          {/* Room type item */}
          <div className="selectRoom__typeList--item">
            <section className="selectRoom__typeList--detail">
              <h6>Double Room</h6>
              <span>Pay not thing until September 04,2022</span>
              <span>
                Max people:{" "}
                <span>
                  <b>2</b>
                </span>
              </span>
              <b>$350</b>
            </section>
            {/* Room checkboxs */}
            <section className="selectRoom__typeList--rooms">
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">101</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">201</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">202</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">203</label>
                <input type="checkbox" />
              </form>
            </section>
            {/* Room checkboxs */}
          </div>
          {/* Room type item */}
          {/* Room type item */}
          <div className="selectRoom__typeList--item">
            <section className="selectRoom__typeList--detail">
              <h6>Double Room</h6>
              <span>Pay not thing until September 04,2022</span>
              <span>
                Max people:{" "}
                <span>
                  <b>2</b>
                </span>
              </span>
              <b>$350</b>
            </section>
            {/* Room checkboxs */}
            <section className="selectRoom__typeList--rooms">
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">101</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">201</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">202</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">203</label>
                <input type="checkbox" />
              </form>
            </section>
            {/* Room checkboxs */}
          </div>
          {/* Room type item */}
          {/* Room type item */}
          <div className="selectRoom__typeList--item">
            <section className="selectRoom__typeList--detail">
              <h6>Double Room</h6>
              <span>Pay not thing until September 04,2022</span>
              <span>
                Max people:{" "}
                <span>
                  <b>2</b>
                </span>
              </span>
              <b>$350</b>
            </section>
            {/* Room checkboxs */}
            <section className="selectRoom__typeList--rooms">
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">101</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">201</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">202</label>
                <input type="checkbox" />
              </form>
              <form className="selectRoom__typeList--checkbox">
                <label htmlFor="">203</label>
                <input type="checkbox" />
              </form>
            </section>
            {/* Room checkboxs */}
          </div>
          {/* Room type item */}
        </div>
        {/* Room type list */}
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

export default BookingForm;
