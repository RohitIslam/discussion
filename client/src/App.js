import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./Components/Layouts/Navbar";
import Landing from "./Components/Layouts/Landing";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
