import React, { useState } from "react";
import "./sign.scss"
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn() {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("signin")

  const sublogin = e => {
    e.preventDefault();

    status === "signin"
      ? axios
        .post(`http://localhost:5000/auth/login`, {
          login,
          password
        })
      : axios
        .post(`http://localhost:5000/auth/signup`, {
          login,
          name,
          password
        })


        .then(({ data }) => {

        })
        .then(() => {
          history.push("/profil");
        })
        .catch(err => {
          if (err) return history.push("/connexion"), setError(true);
        });
  };

  return (<div className="form">
    <div className="choice">
      <div onClick={() => setStatus("signin")} className={`signin${status === "signin" ? ` select` : ""}`}>Se connecter</div>
      <div onClick={() => setStatus("signup")} className={`signup${status === "signup" ? ` select` : ""}`} >Devenir membre</div>
    </div>

    <form className="connexion" onSubmit={e => {
      sublogin(e);
    }}>

      {error
        ? <h2>Votre identifiant ou mot de passe est incorrect</h2>
        : null}

      {status === "signup"
        ? <label className="name" htmlFor="name">
          Nom:
      <input type="text" name="name" id="name" value={name} onChange={evt => setName(evt.target.value)} />
        </label>
        : null}

      <label className="login" htmlFor="login">
        Email:
      <input type="text" name="login" id="login" value={login} onChange={evt => setLogin(evt.target.value)} />
      </label>

      <label htmlFor="pass">
        Mot de passe (8 charact min):
        <input type="password" name="password" id="pass" minLength="8" maxLength="20" required value={password} onChange={evt => setPassword(evt.target.value)} />
      </label>

      <input className="button" type="submit" value={status === "signin"
        ? "Connexion"
        : "S'inscrire"} ></input>



    </form>

  </div>


  )
}

export default SignIn;