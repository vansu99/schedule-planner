import { Collapse } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "actions/Todos/card.action";
import { listActions } from "actions/Todos/list.action";
import TodoForm from "./index";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "30rem",
    maxHeight: "100%",
    padding: "0 0.5rem"
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: "#EBECF0",
    fontFamily: "Poppins, sans-serif",
    "&:hover": {
      backgroundColor: fade("#000", 0.25),
      cursor: "pointer"
    }
  },
  btnAddCard: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1.5rem"
  }
}));

export default function TodoFormContainer({ isLists, listId }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const label = isLists ? translate("add_list") : translate("add_card");
  const placeholder = isLists ? "Nhập tiêu đề danh sách" : "Enter a title for this card...";
  const userId = useSelector(state => state.user.currentUser);

  const onChange = e => {
    setTitle(e.target.value);
  };

  const handleCloseForm = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAddList = () => {
    if (title === "") return;
    const newList = { title, cards: [] };

    dispatch(listActions.asyncAddTodoList(boardId, newList));
    setTitle("");
    setOpen(false);
  };

  const handleAddCard = () => {
    if (title === "") return;

    const newCards = {
      title,
      list: listId,
      userId: userId._id,
      boardId
    };
    dispatch(cardActions.asyncAddTodoCard(newCards));
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
