import React from "react";
import "./MemoryCard.css";

function MemoryCard({ color, isFlipped, onClick }) {
  let className = "memory card";
  if (isFlipped) {
    className = className + " " + color; /*from the screenshot*/
  }
  return <div className={className} onClick={(card) => onClick(card)} />;
}

export default MemoryCard;
