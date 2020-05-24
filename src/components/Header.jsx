import React, { useEffect } from "react";
import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Axios from 'axios';
const { apiSite } = require("../conf");

export default function Header() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const isLogin = () => {
    if (localStorage.getItem('token') != null) {
      return true
    }
    return false
  }
  useEffect(() => {

    Axios.get(`${apiSite}/${user.id}`)
      .then(({ data }) => {
        dispatch({ type: "FETCHING_USER_DATA", value: data })
      })
  }, [dispatch, user.id])
  console.log(user);

  return (
    <div className="header">
      {isLogin()}
      <style>
        @import url('https://fonts.googleapis.com/css?family=Lora:400,500,600,700&display=swap');
</style>
      <div className="nav">
        <ul>
          <li className="destinations">Destinations</li>
          <li>
            <a href="/">
              <img src="https://res.cloudinary.com/blandine/image/upload/v1586076479/harley_trip_rogner.png" alt="logo"></img>
            </a>
          </li>
          {isLogin()
            ? <Link to="/profil">
              <li>{user.avatar}</li>
            </Link>
            : <Link to="/connexion">
              <li>Se connecter</li>
            </Link>
          }
        </ul>
      </div>
    </div>
  );
}