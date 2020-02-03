import React from "react";
import "./style/header.scss";

export default function Header() {
  return (
    <div className="header">
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Indie+Flower|Lobster&display=swap');
      </style>
      <a href="/">
        <h1>Viens Chercher Bonheur !</h1>
      </a>
    </div>
  );
}
