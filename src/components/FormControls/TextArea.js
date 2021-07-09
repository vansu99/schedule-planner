import React, { useRef } from 'react';

export default function TextArea({ placeholder, text, setText }) {
  const textRef = useRef();

  const onChange = e => {
    const target = e.target;
    textRef.current.style.height = '94px';
    textRef.current.style.height = `${target.scrollHeight}px`;
    setText(textRef.current.value);
  };

  return (
    <React.Fragment>
      <textarea value={text} ref={textRef} onChange={onChange} rows="4" placeholder={placeholder} />
    </React.Fragment>
  );
}
