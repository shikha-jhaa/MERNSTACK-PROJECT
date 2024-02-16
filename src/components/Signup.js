import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.png";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: ''
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, work, password, cpassword })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        throw new Error(data.message || "Invalid Registration");
      }
      window.alert("Registration successful");
      console.log("Registration successful")
      history.push("/login");
    } catch (error) {
      console.error("Registration Error:", error.message);
      window.alert("Registration failed. Please try again.");
    }
  }

  return (
    <>
      <section className='signup'>
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign up</h2>
              <form method="POST" className='register-form' id="register-form">
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input type="text" name="name" id="name" autoComplete='off'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Your Name' />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off'
                    value={user.email}
                    onChange={handleInputs}
                    placeholder='Your Email' />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>
                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>
                  <input type="tel" name="phone" id="phone" autoComplete='off'
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder='Your Phone' />
                </div>
                <div className='form-group'>
                  <label htmlFor='work'>
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input type="text" name="work" id="work" autoComplete='off'
                    value={user.work}
                    onChange={handleInputs}
                    placeholder='Your Profession' />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off'
                    value={user.password}
                    onChange={handleInputs}
                    placeholder='Your Password' />
                </div>
                <div className='form-group'>
                  <label htmlFor='cpassword'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="cpassword" id="cpassword" autoComplete='off'
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder='Confirm Your Password' />
                </div>
                <div className='form-group form-button'>
                  <input type="submit" name="signup" id='signup' className='form-submit' value="Register"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>
            <div className='signup-image'>
              <figure>
                <img src={signpic} alt='registration pic' />
              </figure>
              <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;




