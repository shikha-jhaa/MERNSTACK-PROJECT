
import React, { useEffect, useState } from 'react';
// const jwt = require('jsonwebtoken');

const Contact = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const userContact = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Token ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to fetch user data. Please try again later.');
    }
  };

  useEffect(() => {
    userContact();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value});
  };

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI5M2I0NTkwMmRjNzg4YWIzNzZiYWIiLCJpYXQiOjE3MDc2NjM2MjN9.UKRY0D_SUQR7vCpCk9GnjPPVXD0cmGoOAoB2Vrz5aSU";
    const res = await fetch("/Contact", {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();
    if (!data) {
      console.log("Message not sent");
    } else {
      alert('Message sent');
      setUserData({...userData, message: ""});
    }
  };
  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
              <div className='contact-info-item d-flex justify-content-start align-item-center'>
                <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='phone'/>
                <div className='contact-info-content'>
                  <div className='contact-info-tittle'>
                    Phone
                  </div>
                  <div className='contact-info-text'>
                    {userData.phone}
                  </div>
                </div>
              </div>
              <div className='contact-info-item d-flex justify-content-start align-item-center'>
                <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='phone'/>
                <div className='contact-info-content'>
                  <div className='contact-info-tittle'>
                    Email
                  </div>
                  <div className='contact-info-text'>
                    {userData.email}
                  </div>
                </div>
              </div>
              <div className='contact-info-item d-flex justify-content-start align-item-center'>
                <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='phone'/>
                <div className='contact-info-content'>
                  <div className='contact-info-tittle'>
                    Address
                  </div>
                  <div className='contact-info-text'>
                    Punjab, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact_form_container py-5'>
                <div method="POST" className='contact_form_tittle'>
                  Get in Touch
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form id="contact_form" onSubmit={contactForm}>
                  <div className='contact_form_name d-flex justify-content-between align-item-between'>
                    <input
                      type="text"
                      id="contact_form_name"
                      className='contact_form_name input-field'
                      name='name'
                      value={userData.name}
                      onChange={handleInputs}
                      placeholder='Your name'
                      required={true}
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className='contact_form_email input-field'
                      name='email'
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder='Your Email'
                      required={true}
                    />
                    <input
                      type="tel"
                      id="contact_form_phone"
                      className='contact_form_phone input-field'
                      name='phone'
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder='Your phone number'
                      required={true}
                    />
                  </div>
                  <div className='contact_form_text mt-5'>
                    <textarea
                      className='text_field contact_form_message' 
                      name='message'
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder='Message'
                      cols="30" rows="10"
                      required={true}
                    />
                  </div>
                  <div className='contact_form_button'>
                    <button type='submit' className='button contact_submit_button'>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;


