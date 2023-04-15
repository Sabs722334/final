import { Socket } from "socket.io-client";
import "./Home.css";
import React, { useState } from "react";
import axios from "axios";

//create an interface for the props that you want to pass to this component
interface HomePageProps {
  //you can always add more functions/objects that you would like as props for this component
}

function HomePage({}: HomePageProps) {
  const [message, setMessage] = useState("");
  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };
  async function handleClick() {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="sampleHomePage">
        <h1 className="sampleTitle"></h1>
        <div className="sampleMessage">
          <button onClick={() => handleClick()}>
            LOGIN
          </button>
          <button onClick={() => handleClick()}>
            SIGNUP
          </button>
        </div>
      </div>
    </>
  );
}
export default HomePage;
