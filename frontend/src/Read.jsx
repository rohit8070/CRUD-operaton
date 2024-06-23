import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Read = () => {
  const { id } = useParams();
  const [folowers, setFolowers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/` + id)
      .then((res) => {
        console.log(res);
        setFolowers(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Follower Details</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">ID: {folowers.id}</h3>
          <h3 className="card-subtitle mb-2 text-muted">
            Username: {folowers.username}
          </h3>
          <h3 className="card-subtitle mb-2 text-muted">
            Email: {folowers.email}
          </h3>
        </div>
      </div>
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Read;
