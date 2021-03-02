import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { pathName } from "../../configs";
import "./home.scss";

function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <Link to={pathName.TODO_LIST}>Board</Link>
    </div>
  );
}

export default memo(Home);
