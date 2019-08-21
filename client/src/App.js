import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Layouts/Navbar";
import Footer from "./Components/Layouts/Footer";
import Landing from "./Components/Layouts/Landing";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
