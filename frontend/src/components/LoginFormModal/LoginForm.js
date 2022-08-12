import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../DemoUser";
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    };

    return (
      <div className="login-modal">
        <form onSubmit={handleSubmit} className='login-form'>
          <h1>Login</h1>
          <div className='login-form'>
            <span className="login-error">{errors[0]}</span>
            <div className='user-email-ctn'>
              <input
                type="text"
                value={credential}
                placeholder='Email or Username'
                onChange={(e) => setCredential(e.target.value)}
                style={{border: errors.length ? '1px solid rgb(246, 94, 94)' : ''}}
                required
              />
            </div>
            <div className='password-ctn'>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                style={{border: errors.length ? '1px solid rgb(246, 94, 94)' : ''}}
                required
              />
            </div>
            <div className="login-btns">
              <div className='login-btn'>
                <button type="submit">Log In</button>
              </div>
              <div className='login-demo'>
                <DemoUser />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default LoginForm;
