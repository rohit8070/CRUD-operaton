import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    id: "",
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/create", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.data &&
          err.response.data.code === "ER_DUP_ENTRY"
        ) {
          alert("ID already exists. Please enter a unique ID.");
        }
        // else {
        //   setError("An error occurred. Please try again.");
        // }
      });
  };
  ``;
  return (
    <div>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div className="form-group row">
              <label htmlFor="id" className="col-sm-4 mb-2 col-form-label">
                Enter ID
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Enter ID"
                  value={values.id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="username"
                className="col-sm-4 mb-2 col-form-label"
              >
                Username
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-4 mb-2 col-form-label">
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
          <br />
          <br />

          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Create;
