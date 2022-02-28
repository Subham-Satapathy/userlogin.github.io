import React from 'react';
import './App.css';
import { Link} from "react-router-dom";
const App = () => {
  return (
    <>
    <h1>Welcome</h1>
    <div className="app_container">
    <Link to= "/signup">
    <button type="button contact-button" id="button1">Sign Up</button>
    </Link>
    <Link to= "/signin">
    <button type="button contact-button" id="button2">Sign In</button>
    </Link>
    </div>
    </>
  )
}

export default App