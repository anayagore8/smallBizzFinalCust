import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    landmark: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/shops";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Mobile No"
              name="mobileNo"
              onChange={handleChange}
              value={data.mobileNo}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Landmark"
              name="landmark"
              onChange={handleChange}
              value={data.landmark}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
              value={data.city}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              onChange={handleChange}
              value={data.state}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Pincode"
              name="pincode"
              onChange={handleChange}
              value={data.pincode}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
