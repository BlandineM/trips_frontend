import React from "react";
import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <style>
        @import url('https://fonts.googleapis.com/css?family=Lora:400,500,600,700&display=swap');
</style>
      <a href="/">
        <img src="https://res.cloudinary.com/blandine/image/upload/v1585598420/Harley_s_trip.png"></img>
      </a>
      <h1 className="title">Tu ne sais pas où et quand partir en voyage?</h1>
    </div>
  );
}