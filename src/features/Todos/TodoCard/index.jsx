import React, { useState } from 'react';
import Avatar from '../../../components/Avatar';
import "./todoCard.scss";

export default function TodoCard({ title, cardId, member }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="todoCard">
      <div className="todoCard__container">
        <div className="todoCard__title">
          <p>{title}</p>
        </div>
        <div className="todoCard__member">
          {
            member.length > 0 && member.map((value, index)=> (
              <Avatar src={value} key={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
