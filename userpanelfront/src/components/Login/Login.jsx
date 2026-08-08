import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { assests } from "../../assets/assests";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, loadCartData } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
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
      const response = await login(data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        await loadCartData(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Unable to login", error);
      toast.error("Unable to login. Please try again");
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
                <h5 className="pk-auth-title mt-3 mb-1">Welcome Back</h5>
                <p className="text-muted small mb-0">Sign in to continue shopping</p>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
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
                    {submitting ? "Signing in..." : "Sign In"}
                  </button>
                </div>
                <div className="mt-4 text-center small">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;