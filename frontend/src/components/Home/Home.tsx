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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const checkPassword = (password: string) => {
    // check if password is at least 8 characters
    // Check if atleast one Uppercase letter
    // Check if atleast one number
    if (password.length < 8) {
      alert ("Password must be at least 8 characters");
      return false;
    }
    if (!password.match(/[A-Z]/)) {
      alert ("Password must contain at least one uppercase letter");
      return false;
    }
    if (!password.match(/[0-9]/)) {
      alert ("Password must contain at least one number");
      return false;
    }
    return true;
  };
  
  async function handleClick(event: any) {
    event.preventDefault();
    if (!signIn) {
      const validPassword = checkPassword(password);
      if (validPassword) {
        const user = await axios.post("http://localhost:3001/auth/signup", { username, password })
        console.log(user)
      };
    } else {
      const user = await axios.post("http://localhost:3001/auth/signin", { username, password });
      console.log(user)
    }
  }
  return (
    <>
      <div className="homepage">
        <div className="auth-window">
          <h3 className="auth-title">{signIn ? "Login" : "Register"}</h3>
          <form className="form">
            <input className="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="btn-auth" type="submit" onClick={(e)=>{handleClick(e)}}>
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
