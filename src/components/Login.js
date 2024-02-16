// import React, { useState } from 'react';
// import loginpic from "../images/login.png";
// import { NavLink, useHistory } from 'react-router-dom';

// const Login = () => {
//   const history = useHistory();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loginUser = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     });
//     const data = await res.json();
//     if (res.status === 400 || !data) {
//       window.alert("Invalid Credentials");
//     } else {
//       window.alert("Login Successful");
//       console.log('Login successful');
//       history.push("/");
//     }
//   };

//   return (
//     <>
//       <section className='sign-in'>
//         <div className='container mt-5'>
//           <div className='signin-content'>
//             <div className='signup-form'>
//               <h2 className='form-title'>Sign in</h2>
//               <form method='POST' onSubmit={loginUser} className='register-form' id="register-form">
//                 <div className='form-group'>
//                   <label htmlFor='email'>
//                     <i className="zmdi zmdi-email material-icons-name"></i>
//                   </label>
//                   <input type="email" name="email" id="email" autoComplete='off'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder='Your Email' />
//                 </div>
//                 <div className='form-group'>
//                   <label htmlFor='password'>
//                     <i className="zmdi zmdi-lock material-icons-name"></i>
//                   </label>
//                   <input type="password" name="password" id="password" autoComplete='off'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder='Your Password' />
//                 </div>
//                 <div className='form-group form-button'>
//                   <input type="submit" name="signup" id='signup' className='form-submit' value="Log In" 
//                     onClick={loginUser}/>
//                 </div>
//               </form>
//             </div>
//             <div className='signin-image'>
//               <figure>
//                 <img src={loginpic} alt='login pic' />
//               </figure>
//               <NavLink to="/signin" className="signin-image-link">Create an Account</NavLink>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// export default Login;
import React, { useState } from 'react';
import loginpic from "../images/login.png";
import { NavLink, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

const Login = () => {
  const {state, dispatch}= useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    console.log(data,'data');
    if (res.status === 400 || !data) {
      setErrorMessage("Invalid Credentials");
    } else {
      dispatch({type:"USER", payload:true})
      setErrorMessage("Login Successful");
      console.log('Login successful');
      localStorage.setItem('token',data.token)
      history.push("/about");
    }
  };

  return (
    <>
      <section className='sign-in'>
        <div className='container mt-5'>
          <div className='signin-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign in</h2>
              <form method='POST' onSubmit={loginUser} className='register-form' id="register-form">
                <div className='form-group'>
                  <label htmlFor='email'>
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Your email' />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Your Password' />
                </div>
                <div className='form-group form-button'>
                  <input type="submit" name="signup" id='signup' className='form-submit' value="Log In" />
                </div>
              </form>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <div className='signin-image'>
              <figure>
                <img src={loginpic} alt='login pic' />
              </figure>
              <NavLink to="/signin" className="signin-image-link">Create an Account</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;


