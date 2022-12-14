import React from "react";
import Table from "react-bootstrap/Table";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";

import "./dashboard.css";

import { post } from "../../utils/fetch";

const renderTableItem = (item, index) => {
  const dateEnd = new Date(item.dateEnd);
  const dateStart = new Date(item.dateStart);
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{item.hotelName}</td>
      <td>
        {item.rooms.map((room, i) => {
          if (i > 0) {
            return "," + room.roomNumber.number;
          } else {
            return room.roomNumber.number;
          }
        })}
      </td>
      <td>
        {dateStart.getDate() +
          "/" +
          dateStart.getMonth() +
          "/" +
          parseInt(dateStart.getMonth() + 1) +
          " - " +
          dateEnd.getDate() +
          "/" +
          parseInt(dateEnd.getMonth() + 1) +
          "/" +
          dateEnd.getFullYear()}
      </td>
      <td>${item.price}</td>
      <td>{item.payment}</td>
      <td>{item.status}</td>
    </tr>
  );
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.user.loginUser);

  useEffect(() => {
    const getTransaction = async () => {
      const response = await post("/get-transaction-by-user-id", {
        userId: user._id,
      });
      //   console.log("response:", response.data);
      setTransactions(response.data);
    };
    getTransaction();
  }, []);

  return (
    <section>
      <Navbar />
      <Header />

      <section className="transac__tb__container">
        <h3>Your Transactions</h3>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((item, i) => renderTableItem(item, i))
            ) : (
              <tr>
                <td colSpan={7}>No transaction found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>
      <MailList />
      <Footer />
    </section>
  );
};

export default Dashboard;
