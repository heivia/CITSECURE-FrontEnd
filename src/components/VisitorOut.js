import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VisitorOut = () => {
  const [cardNo, setCardNo] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ampm, setAmPm] = useState('AM'); // Default AM/PM is 'AM'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to get current system time in a formatted string
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  useEffect(() => {
    // Set the initial time when the component mounts
    setInitialTime();
  }, []);

  const setInitialTime = () => {
    const currentTime = getCurrentTime();
    const [hour, minute, period] = currentTime.split(/:|\s/); // Split the time string
    setHours(hour);
    setMinutes(minute);
    setAmPm(period);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`;
      const response = await axios.post(
        `http://localhost:8080/admin/updateVisitorTimeOut/${cardNo}`,
        null,
        {
          params: {
            cardNo: cardNo,
            timeOut: formattedTime,
          },
        }
      );

      if (response.status === 200) {
        navigate('/menu');
      } else {
        setError('Submit failed. Please try again.');
      }
    } catch (error) {
      console.error('Submit failed:', error.message);
      setError('Submit failed. Please try again.');
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("images/TIME OUT.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  };

  const formStyle = {
    border: '3px solid #A43F3F',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF9EB',
  };

  const inputStyle = {
    borderColor: '#A43F3F',
    borderRadius: '8px',
  };

  const loginButtonStyle = {
    backgroundColor: '#A43F3F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const titleStyle = {
    color: '#A43F3F',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass" style={formStyle}>
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="formCardNo">
                    Enter Card No.
                  </label>
                 
                  <input
                    type="number"
                    id="formCardNo"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={cardNo}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Check if the value is not negative before updating state
                      if (value >= 0) {
                        setCardNo(value);
                      }
                    }}
                    required
                  />

                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="timeOut">
                    Time Out
                  </label>
                  <input
                    type="text"
                    id="timeOut"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`}
                    readOnly // Make the input read-only
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={loginButtonStyle}
                >
                  Submit
                </button>

                <div className="text-center">
                  {/* Remove the social media buttons */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorOut;
