import React from 'react';
import './styles.css';
import logo from './asset/logo2.jpg';
import gradient from './asset/gradient.png';
import '@splinetool/viewer';
import { Link } from 'react-router-dom';
import Login from './pages/Authentication/Login.jsx';

function Landing() {
  return (
    <>
      <img className="img_gradient" src={gradient} alt="gradient" />

      <div className="layer_blur"></div>

      <div className="container">
        <header>
          <img className="logo" src={logo} alt="logo" />

          <nav className="navbar">
            <Link to="/">Home</Link>
        
            <Link to="">Event</Link>
         <Link to="./documentation">Documentation</Link>
          </nav>

          <Link to="/login" className="btn-signing">
            Sign in
          </Link>
          <Link to="/signup" className="btn-signup ">
            Sign up
          </Link>
        </header>

        <div className="content">
          <div className="tag-box">
            <div className="tag">AXAMISE</div>
          </div>

          <h1>Welcome to Our Website</h1>
          <p>We are glad to have you here.</p>

          <div className="buttons">
            {/* <a href="" className="btn-signing-main">
              Get started
            </a> */}
            <Link to="/login" className="btn-signing-main">
           Get started
          </Link>
          </div>
        </div>

        {/* 3D model */}

        <spline-viewer
          class="robot-3d"
          url="https://prod.spline.design/vLAAq66G-R6DRzG5/scene.splinecode"
        ></spline-viewer>
      </div>
    </>
  );
}

export default Landing;
