import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";

function SocketClient(props) {
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket.socket);
  //const user = useSelector(getCurrentUser);

  // useEffect(() => {
  //   socket.on("likeToClient", newComment => {
  //     console.log({newComment});
  //   });

  //   return () => socket.off("likeToClient");
  // }, [socket]);

  return <div></div>;
}

SocketClient.propTypes = {};

export default SocketClient;
