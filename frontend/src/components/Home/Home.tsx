import { Socket } from "socket.io-client";
import "./Home.css";
import React, { useState } from "react";
import axios from "axios";

//create an interface for the props that you want to pass to this component
interface HomePageProps {
  //you can always add more functions/objects that you would like as props for this component
}

function HomePage(props: HomePageProps) {
  const [signIn, setSignIn] = useState(true);
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
      <div className="homepage">
        <div className="auth-window">
          <h3 className="auth-title">{signIn ? "Login" : "Register"}</h3>
          <form className="form">
            <input className="input" type="text" placeholder="Username" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn-auth" type="submit" onClick={handleClick}>
              {signIn ? "Login" : "Register"}
            </button>
          </form>
          {signIn ? (
            <p className="toggle-auth">
              Don't have an account?{" "}
              <span onClick={() => setSignIn(false)}>Register</span>
            </p>
          ) : (
              <p className="toggle-auth">
                Already have an account?{" "}
                <span onClick={() => setSignIn(true)}>Login</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export default HomePage;
