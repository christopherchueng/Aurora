import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import DemoUser from "../DemoUser";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(["'Confirm Password' and 'Password' field do not match."]);
  };

  return (
    <div className="signup-modal">
      <form onSubmit={handleSubmit} className='signup-form'>
          <h1>Sign Up</h1>
          <ul className="signup-error-list">
            {errors.map((error, idx) => <li key={idx} className='signup-error'>{error}</li>)}
          </ul>
        <div className='signup-form'>
          <div className='signup-email-ctn'>
            {/* <p>Email</p> */}
            <input
              type="text"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='signup-username-ctn'>
            {/* <p>Username</p> */}
            <input
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='signup-password-ctn'>
            {/* <p>Password</p> */}
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='signup-cpassword-ctn'>
            {/* <p>Confirm Password</p> */}
            <input
              type="password"
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-btns">
            <div className="signup-btn">
              <button type="submit">Sign Up</button>
            </div>
            <div className='signup-demo'>
                <DemoUser />
              </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default SignupForm;
