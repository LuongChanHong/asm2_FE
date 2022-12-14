import React from "react";
import { useNavigate } from "react-router-dom";

import "../../navbar/navbar.css";

const TransactionButton = () => {
  const navigate = useNavigate();

  return (
    <section>
      <form>
        <button onClick={() => navigate("/dashboard")} className="navButton">
          Transaction
        </button>
      </form>
    </section>
  );
};

export default TransactionButton;
