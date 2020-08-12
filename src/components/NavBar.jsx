import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.scss";

export default function NavBar(props) {
  return (
    <div className="month">
      <ul>
        <NavLink to={`/${props.place}/01`}>
          <li>JANV</li>
        </NavLink>

        <NavLink to={`/${props.place}/02`}>
          <li>FEVR</li>
        </NavLink>

        <NavLink to={`/${props.place}/03`}>
          <li>MAR</li>
        </NavLink>

        <NavLink to={`/${props.place}/04`}>
          <li>AVR</li>
        </NavLink>

        <NavLink to={`/${props.place}/05`}>
          <li>MAI</li>
        </NavLink>

        <NavLink to={`/${props.place}/06`}>
          <li>JUIN</li>
        </NavLink>

        <NavLink to={`/${props.place}/07`}>
          <li>JUIL</li>
        </NavLink>

        <NavLink to={`/${props.place}/08`}>
          <li>AOU</li>
        </NavLink>

        <NavLink to={`/${props.place}/09`}>
          <li>SEPT</li>
        </NavLink>

        <NavLink to={`/${props.place}/10`}>
          <li>OCT</li>
        </NavLink>

        <NavLink to={`/${props.place}/11`}>
          <li>NOV</li>
        </NavLink>

        <NavLink to={`/${props.place}/12`}>
          <li>DEC</li>
        </NavLink>

        <NavLink to={`/${props.place}`}>
          <li>TOUT</li>
        </NavLink>
      </ul>
    </div>
  );
}
