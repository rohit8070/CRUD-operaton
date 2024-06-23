import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/` + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h1>Followers Details</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((folowers, index) => (
            <tr key={index}>
              <td>{folowers.id}</td>
              <td>{folowers.username}</td>
              <td>{folowers.email}</td>
              <td>
                <button className="btn btn-primary mr-2">
                  <Link to={`/read/${folowers.id}`} className="text-white">
                    Read
                  </Link>
                </button>
                <button className="btn btn-warning mr-2">
                  <Link to={`/edit/${folowers.id}`} className="text-white">
                    Edit
                  </Link>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(folowers.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <Link to="/create" className="btn btn-success">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
