import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ scan, title, pages, isNew }) {
  return (
    <div className={`Card ${isNew ? "new" : ""}`}>
      {isNew && <span className="new-badge">Nouveau</span>}
      <h3>{title}</h3>
      <p>{scan}</p>
      <Link to={`/scans/${scan}`}>
  <img src={pages + "01.png"} alt={title} />
</Link>
    </div>
  );
}

export default Card;
