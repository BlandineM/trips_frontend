import React from "react";
import Homepage from "./components/pages/homepage/Homepage";
import Footer from "./components/Footer";
import Type from "./components/pages/countries/all/Type";
import Month from "./components/pages/countries/month/Month";
import AddTrip from "./components/pages/new-trip/AddTrip";
import Header from "./components/Header";
import Sign from './components/pages/auth/Sign';
import NewTrip from "./components/pages/profil/NewTrip"
import { Switch, Route } from "react-router-dom";
import User from './components/pages/profil/User';


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:type/:month" component={Month} />
        <Route path="/newtrip" component={AddTrip} />
        <Route path="/connexion" component={Sign} />
        <Route path="/profil" component={User} />
        <Route path="/new" component={NewTrip} />
        <Route path="/:type" component={Type} />
      </Switch>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
