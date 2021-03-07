import { Collapse } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { todosActions } from "../../../actions/Todos";
import TodoForm from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    maxHeight: "100%",
    padding: "0 0.5rem",
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: "#EBECF0",
    fontFamily: "Poppins, sans-serif",
    "&:hover": {
      backgroundColor: fade("#000", 0.25),
      cursor: "pointer",
    },
  },
  btnAddCard: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1.5rem",
  },
}));

export default function TodoFormContainer({ isLists, listId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const label = isLists ? "Thêm danh sách khác" : "Thêm thẻ khác";
  const placeholder = isLists ? "Nhập tiêu đề danh sách" : "Enter a title for this card...";

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCloseForm = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAddList = () => {
    if (title === "") return;
    const newList = { title, cards: [] };

    dispatch(todosActions.asyncAddTodoList(newList));
    setTitle("");
    setOpen(false);
  };

  const handleAddCard = () => {
    if (title === "") return;

    const _id = `card-${uuidv4()}`;
    const newCards = {
      _id,
      title,
      list: listId,
      member: [],
    };
    dispatch(todosActions.asyncAddTodoCard(newCards));
    setTitle("");
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <TodoForm
          handleCloseForm={handleCloseForm}
          text={title}
          isLists={isLists}
          placeholder={placeholder}
          handleChange={onChange}
        >
          <button
            type="submit"
            className="todoForm__button todoForm__button--ok"
            onClick={isLists ? handleAddList : handleAddCard}
          >
            Save
          </button>
        </TodoForm>
      </Collapse>
      <Collapse in={!open}>
        <button className="todoForm__createButton" onClick={() => setOpen(!open)}>
          <i className="bx bx-plus"></i>
          {label}
        </button>
      </Collapse>
    </div>
  );
}
