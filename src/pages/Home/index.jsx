import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./home.scss";

function Home() {
  const dispatch = useDispatch();
  const [userData] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div>
      <Link to={`/users/${userData._id}`}>User detail</Link>
    </div>
  );
}

export default memo(Home);
