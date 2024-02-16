

import React, { useEffect, useState } from 'react';
import shikhapic from "../images/shikha.jpg";
import aboutpic from "../images/aboutpic.jpg";
import { useHistory } from 'react-router-dom';

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  const fetchUserData = async () => {

    try {
      const token = localStorage.getItem('token')
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          'Content-Type': "application/json",
          'Authorization': `Token ${token}`
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch user data");
      }
      setUserData(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
      history.push("/about");
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='container emp-profile'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-image'>
                <img src={userData.name === "shikha" ? shikhapic : aboutpic} alt='shikha' className='img-fluid profile-image' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='profile-head'>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className='profile-rating mt-3 mb-5'>RANKINGS: <span> 1/10 </span></p>
                <ul className="nav nav-tabs" role='tablist'>
                  <li className="nav-item">
                    <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role='tab'>About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role='tab'>Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-md-2'>
              <input type='submit' className='btn btn-primary profile-edit-btn' name='btnAddMore' value="edit profile" />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-work'>
                <p>WORK LINK</p>
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Youtube</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Instagram</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Shikha</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Figma</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Web Developer</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Software Developer</a> <br />
                <a href='www.youtube.com/@dancingqueensonajha3183' target='shikha'>Dancingqueensonajha3183</a> <br />
              </div>
            </div>
            <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id='mytabcontent'>
                <div className='tab-pane fade show active' id='about' role='tabpanel' aria-labelledby='about-tab'>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>User Id</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.myId || 'N/A'}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Name</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Email</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Phone</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userData.phone}</p>
                    </div>

                    <div className='col-md-6'>
                      <label>Hourly Rate</label>
                    </div>
                    <div className='col-md-6'>
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Total Projects</label>
                    </div>
                    <div className='col-md-6'>
                      <p>230</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>English Level</label>
                    </div>
                    <div className='col-md-6'>
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Availability</label>
                    </div>
                    <div className='col-md-6'>
                      <p>6 Months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default About;



