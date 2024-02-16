import React, {useEffect, useState} from 'react'

const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState('');
  const userHomePage = async () => {
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
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    userHomePage();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='home-page'>
        <div className='home-div'>
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h2>{show  ? 'Happy, to see you back' : 'we are the MERN Developer'}</h2>
        </div>
      </div>
     
    </>
  )
}
export default Home
