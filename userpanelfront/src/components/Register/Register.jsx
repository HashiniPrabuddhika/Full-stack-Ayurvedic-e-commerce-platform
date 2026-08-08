import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../service/authService';
import { assests } from '../../assets/assests';

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success('Registration completed. Please login');
        navigate('/login');
      } else {
        toast.error('Unable to register. Please try again later!');
      }
    } catch {
      toast.error('Unable to register. Please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pk-auth-container">
      <div className="row w-100">
        <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
          <div className="card border-0 shadow rounded-4 my-5 pk-auth-card">
            <div className="card-body p-4 p-sm-5">
              <div className="text-center mb-4">
                <img src={assests.logo} alt="Prakruti Ayurveda" height={56} width={56} />
                <h5 className="pk-auth-title mt-3 mb-1">Create an Account</h5>
                <p className="text-muted small mb-0">Join us for pure, natural wellness</p>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Nimal Perera"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                  <label htmlFor="floatingName">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="nimal@gmail.com"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                  <label htmlFor="floatingEmail">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-gold py-2 mb-2 mt-3"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Creating account...' : 'Sign Up'}
                  </button>
                </div>
                <div className="mt-4 text-center small">
                  Already have an account? <Link to="/login">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;