import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ClearIcon from "@material-ui/icons/Clear";
import List from "@material-ui/core/List";
import { userApis } from "apis";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import UserCard from "../UserCard";
import "./search.scss";

const useStyles = makeStyles(theme => ({
  search: {
    display: "flex",
    flexDirection: "column"
  },
  result: {
    marginTop: theme.spacing(2)
  }
}));

function Search({ onSubmit, cardId }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const typingTimeoutRef = useRef(null);

  const handleChangeSearch = e => {
    setSearch(e.target.value);
    if (!handleFilterMemberTodo) return;

    // cần clear cái timeout cũ để setup timeout mới cho mỗi lần typing
    // check nều đang đợi => thì clear nó đi
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // mỗi lần typing là sẽ đợi 500ms rồi mới chạy lệnh bên trong
    // cứ tiếp tục typing thì sẽ cứ đợi 500ms và mỗi lần thay đổi đó cần xóa đi cái timeout trước đó
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
    <div className={classes.search}>
      <form>
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={search}
            onChange={handleChangeSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClose} edge="end">
                  <ClearIcon color="error" />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </form>
      <div className={classes.result}>
        <List>{users && users.map(user => <UserCard user={user} key={user._id} cardId={cardId} />)}</List>
      </div>
    </div>
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
