import React from "react";
import "./loading.scss";

export default function Loading({ isLoading }) {
  return isLoading ? <div className="dashed-loading"></div> : null;
}
