import React from "react";
import { FaUsers, FaMoneyBill, FaShoppingCart, FaChartLine } from "react-icons/fa";
import "../styles/KpiCards.css";

const KpiCards = () => {

  const cards = [
    {
      title: "Total Customers",
      value: "12,540",
      icon: <FaUsers />
    },
    {
      title: "Revenue",
      value: "₹45,000",
      icon: <FaMoneyBill />
    },
    {
      title: "Orders",
      value: "320",
      icon: <FaShoppingCart />
    },
    {
      title: "Profit",
      value: "₹18,500",
      icon: <FaChartLine />
    }
  ];

  return (
    <div className="kpi-container">

      {cards.map((card,index)=>(
        <div className="kpi-card" key={index}>

          <div className="kpi-icon">
            {card.icon}
          </div>

          <div>
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>

        </div>
      ))}

    </div>
  );
};

export default KpiCards;