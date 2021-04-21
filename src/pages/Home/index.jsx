import { StorageKeys } from "configs";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./home.scss";

function Home() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem(StorageKeys.USER));

  return (
    <div>
      <Link to={`/users/${userData?._id}`}>User detail</Link>
    </div>
  );
}

export default memo(Home);
