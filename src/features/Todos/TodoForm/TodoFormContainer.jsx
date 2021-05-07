import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { cardActions } from "actions/Todos/card.action";
import { listActions } from "actions/Todos/list.action";
import { activityActions } from "actions/Activity/activity.action";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import TodoForm from "./index";

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100%",
    marginBottom: "1rem"
  },
  addCard: {
    width: "100%",
    backgroundColor: theme.palette.background.card,
    fontFamily: "Poppins, sans-serif",
    "&.MuiButton-root:hover": {
      background: theme.palette.background.card,
      boxShadow: "0px 1px 3px 2px rgb(73 71 71 / 17%)",
      cursor: "pointer"
    },
    "& .MuiButton-label > i": {
      marginRight: theme.spacing(1),
      fontSize: theme.spacing(1.8)
    }
  },
  btnAddCard: {
    fontSize: "1.2rem"
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
    dispatch(
      activityActions.asyncCreateNewActivity({
        text: `${userId.username} added ${newList.title} to this board`,
        boardId: boardId
      })
    );
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
    <Box component="div" className={classes.root}>
      <Collapse in={open}>
        <TodoForm
          handleCloseForm={handleCloseForm}
          text={title}
          isLists={isLists}
          placeholder={placeholder}
          handleChange={onChange}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.btnAddCard}
            onClick={isLists ? handleAddList : handleAddCard}
          >
            Save
          </Button>
        </TodoForm>
      </Collapse>
      <Collapse in={!open}>
        <Button disableRipple className={classes.addCard} onClick={() => setOpen(!open)}>
          <i className="bx bx-plus"></i>
          <Typography variant="h6" component="h6" color="textPrimary">
            {label}
          </Typography>
        </Button>
      </Collapse>
    </Box>
  );
}
