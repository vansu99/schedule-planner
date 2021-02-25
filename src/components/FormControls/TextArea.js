import React, { useRef } from "react";

export default function TextArea({ placeholder }) {
  const textRef = useRef();

  const onChange = (e) => {
    const target = e.target;
    textRef.current.style.height = "94px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  return (
    <React.Fragment>
      <textarea ref={textRef} onChange={onChange} rows="4" placeholder={placeholder} />
    </React.Fragment>
  );
}
