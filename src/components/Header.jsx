import React from "react";
import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <style>
        @import url('https://fonts.googleapis.com/css?family=Lora:400,500,600,700&display=swap');
</style>
      <div className="logo">
        <a href="/">
          <img src="https://res.cloudinary.com/blandine/image/upload/v1586076479/harley_trip_rogner.png"></img>
        </a>
      </div>
      <div className="nav">
        <ul>
          <li>Mon profil</li>
        </ul>
      </div>
    </div>
  );
}