/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react"; // 1. Added useState
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
function LoginRegister() {
  const { signup, signin } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // 2. Created a state variable to track if the "active" class is on
  const [isActive, setIsActive] = useState(false);

  // 3. Simplified the switch logic
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const googleLogin = (e) => {
    e.preventDefault(); // Prevents '?' from appearing
    // window.location.href = "http://localhost:5000/auth/google";
  };

  const githubLogin = (e) => {
    e.preventDefault(); // Prevents '?' from appearing
    // window.location.href = "http://localhost:5000/auth/github";
  };

  const register = async (e) => {
    e.preventDefault();
    const success = await signup(form);
    if (success) {
      setIsActive(false);
    }
    setForm({ name: "", email: "", password: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await signin(form);
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      // 4. Dynamic class: if isActive is true, add "active"
      className={`content justify-content-center align-items-center d-flex shadow-lg ${isActive ? "active" : ""}`}
      id='content'>
      {/* --------Register form----------*/}
      <div className='col-md-6 d-flex justify-content-center form-section'>
        <form onSubmit={register}>
          {" "}
          <div className='header-text mb-4'>
            <h1>Create Account</h1>
          </div>
          <div className='input-group mb-3'>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder='Name'
              className='form-control form-control-lg bg-light fs-6'
            />
          </div>
          <div className='input-group mb-3'>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder='Email'
              className='form-control form-control-lg bg-light fs-6'
            />
          </div>
          <div className='input-group mb-3'>
            <input
              name='password'
              type='password'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder='Password'
              className='form-control form-control-lg bg-light fs-6'
            />
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <button
              type='submit'
              className='btn border-white text-white w-50 fs-6'>
              Register
            </button>
          </div>
          {/* OAuth Buttons */}
          <div className='oauth-container'>
            <button
              type='button'
              className='oauth-btn google-btn'
              onClick={googleLogin}>
              <i className='fa-brands fa-google'></i> Continue with Google
            </button>

            <button
              type='submit'
              className='oauth-btn github-btn'
              onClick={githubLogin}>
              <i className='fa-brands fa-github'></i> Continue with GitHub
            </button>
          </div>
        </form>
      </div>

      {/* --------Login form----------*/}
      <div className='col-md-6 right-box form-section'>
        <form onSubmit={handleLogin}>
          <div className='header-text mb-4'>
            <h1>Sign In</h1>
          </div>

          <div className='input-group mb-3'>
            <input
              type='email'
              placeholder='Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className='form-control form-control-lg bg-light fs-6'
            />
          </div>

          <div className='input-group mb-3'>
            <input
              type='password'
              placeholder='Password'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className='form-control form-control-lg bg-light fs-6'
            />
          </div>

          <div className='input-group mb-5 d-flex justify-content-between'>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' />
              <label className='form-check-label text-secondary'>
                <small>Remember me</small>
              </label>
            </div>

            <div className='forgot'>
              <small>
                <a href='#'>Forgot password</a>
              </small>
            </div>
          </div>

          <div className='input-group mb-3 justify-content-center'>
            <button
              type='submit'
              className='btn border-white text-white w-50 fs-6'>
              Login
            </button>
          </div>

          {/* OAuth Buttons */}
          <div className='oauth-container'>
            <button
              type='submit'
              className='oauth-btn google-btn'
              onClick={googleLogin}>
              <i className='fa-brands fa-google'></i> Continue with Google
            </button>

            <button
              type='submit'
              className='oauth-btn github-btn'
              onClick={githubLogin}>
              <i className='fa-brands fa-github'></i> Continue with GitHub
            </button>
          </div>
        </form>
      </div>

      {/* ---------- SWITCH PANEL ----------- */}
      <div className='switch-content'>
        <div className='switch'>
          <div className='switch-panel switch-left'>
            <h1>Hello, Again</h1>
            <p>We are happy to see you back</p>

            <button
              type='button' // Added to prevent refresh
              className='hidden btn border-white text-white w-50 fs-6'
              id='login'
              onClick={handleLoginClick}>
              Login
            </button>
          </div>

          <div className='switch-panel switch-right'>
            <h1>Welcome</h1>
            <p>Join Our Unique Platform, Explore a New Experience</p>

            <button
              type='button' // Added to prevent refresh
              className='hidden btn border-white text-white w-50 fs-6'
              id='register'
              onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
