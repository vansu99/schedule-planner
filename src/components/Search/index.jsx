import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { userApis } from "apis";

import UserCard from "../UserCard";
import "./search.scss";

function Search({ onSubmit, cardId }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const typingTimeoutRef = useRef(null);

  const handleChangeSearch = e => {
    setSearch(e.target.value);
    if (!handleFilterMemberTodo) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: e.target.value
      };
      handleFilterMemberTodo(formValues);
    }, 500);
  };

  const handleClose = e => {
    e.preventDefault();
    setSearch("");
    setUsers([]);
  };

  const handleFilterMemberTodo = async member => {
    if (search) {
      const result = await userApis.searchUser(member.search);
      if (result.status === 200) {
        setUsers(result.data.users);
      }
    }
  };

  return (
    <React.Fragment>
      <form className="search-form">
        <i className="bx bx-search search-icon"></i>
        <input
          type="text"
          name="search"
          onChange={handleChangeSearch}
          value={search}
          className="search-input"
          placeholder="Search"
        />
        <button className="search-button" onClick={handleClose}>
          <i className="bx bx-x search-icon search-icon--danger"></i>
        </button>
      </form>
      <div className="search-result">
        {users.map(user => (
          <UserCard user={user} key={user._id} cardId={cardId} />
        ))}
      </div>
    </React.Fragment>
  );
}

Search.propTypes = {
  onSubmit: PropTypes.func,
  cardId: PropTypes.string
};

Search.defaultProps = {
  onSubmit: null
};

export default Search;
