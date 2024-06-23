import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit() {
  const [values, setValues] = useState({
    id: "",
    username: "",
    email: "",
  });

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/` + id)
      .then((res) => {
        console.log(res);
        setValues(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const navigate = useNavigate();
  const handleupdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/update/` + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleupdate}>
        <h2>Edit Student</h2>
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
              disabled
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 mb-2 col-form-label">
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
        <Link to="/">
          <button className="btn btn-success">Back</button>
        </Link>
      </form>
    </div>
  );
}

export default Edit;
