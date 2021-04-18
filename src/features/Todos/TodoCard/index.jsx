import { Box, CardContent, Paper, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import ChatIcon from "@material-ui/icons/Chat";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DescriptionIcon from "@material-ui/icons/Description";
import GroupIcon from "@material-ui/icons/Group";
import LabelIcon from "@material-ui/icons/Label";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { cardActions } from "actions/Todos/card.action";
import AccordionCpt from "components/Accordion";
import TextArea from "components/FormControls/TextArea";
import ReactModal from "components/Modal";
import Search from "components/Search";
import { labelColors } from "configs/fakeLabel";
import { formatDate } from "helpers";
import { useInput } from "hooks";
import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { CheckListSelect } from "../TodoCheckList";
import TodoForm from "../TodoForm";
import Comments from "./Comment";
import InputComment from "./Comment/InputComment";
import useStyles from "./theme.todoCard";
import "./todoCard.scss";

TodoCard.propTypes = {
  title: PropTypes.string,
  member: PropTypes.array,
  checklist: PropTypes.array,
  desc: PropTypes.string,
  label: PropTypes.array,
  comments: PropTypes.array
};

function TodoCard(props) {
  const { title, cardId, member = [], checklist, index, listId, desc, label, date, comments = [], completed } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { boardId } = useParams();
  const { t: translate } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDescCard, setIsEditDescCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardContent, setCardContent] = useState(title);
  const [descCardContent, setDescCardContent] = useState(desc);
  const [todoCheckListContent, todoCheckListContentChange, reset] = useInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [infoLabel, setInfoLabel] = useState({ name: "", color: "" });
  const [completedTodo, setCompletedTodo] = useState(completed);

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleCloseFormEditDesc = () => {
    setIsEditDescCard(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditCard = () => {
    dispatch(cardActions.asyncEditTodoCard(cardId, cardContent));
    setIsEditing(false);
  };

  const handleEditDescCard = () => {
    dispatch(cardActions.asyncEditDescTodoCard(cardId, descCardContent));
    setIsEditDescCard(false);
  };

  const handleAddDeadLineTodo = useCallback(() => {
    dispatch(cardActions.asyncAddDeadlineTodoCard(cardId, startDate));
  }, [dispatch, startDate]);

  const handleAddCheckList = () => {
    const value = `cklist-${uuidv4()}`;
    const newCheckListTodo = {
      value,
      text: todoCheckListContent,
      status: false
    };
    dispatch(cardActions.asyncAddCheckListCard(cardId, newCheckListTodo));
    reset();
  };

  const handleAddLabelTodoCard = () => {
    const value = `label-${uuidv4()}`;
    const newLabelTodo = {
      ...infoLabel,
      value
    };
    dispatch(cardActions.asyncAddLabelTodo(cardId, newLabelTodo));
    setInfoLabel({
      name: "",
      color: ""
    });
  };

  const handleRemoveCard = () => {
    dispatch(cardActions.asyncRemoveTodoCard(listId, cardId, boardId));
  };

  const handleRemoveMember = memberId => {
    dispatch(cardActions.asyncRemoveMemberTodoCard(cardId, memberId));
  };

  const onChange = e => {
    setCardContent(e.target.value);
  };

  const handleChangeDescCard = e => {
    setDescCardContent(e.target.value);
  };

  const handleChangeCompletedCard = e => {
    setCompletedTodo(e.target.checked);
  };

  const handleUpdateCompletedTodo = () => {
    dispatch(cardActions.asyncUpdateCompletedTodoCard(cardId, completedTodo, boardId));
  };

  const renderTextarea = () => (
    <TodoForm text={cardContent} handleChange={onChange} handleCloseForm={handleCloseForm}>
      <Button type="submit" variant="contained" color="primary" onClick={handleEditCard}>
        Save Edit Card
      </Button>
    </TodoForm>
  );

  const renderTextareaForDescModal = () => (
    <TodoForm text={descCardContent} handleChange={handleChangeDescCard} handleCloseForm={handleCloseFormEditDesc}>
      <Button type="submit" variant="contained" color="primary" onClick={handleEditDescCard}>
        Lưu
      </Button>
    </TodoForm>
  );

  const renderCard = () => (
    <Paper elevation={4} className={classes.paper}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          {label?.length > 0 ? (
            <Box mb={1} className={classes.box}>
              {label?.map((value, index) => (
                <Chip size="small" key={index} label={value?.name} style={{ backgroundColor: `${value.color}` }} />
              ))}
            </Box>
          ) : null}
          <Typography className={classes.title} variant="h5" gutterBottom>
            {title}
          </Typography>
          <Box position="absolute" right={10} top={8} className={classes.box}>
            <IconButton color="primary" onClick={() => setIsEditing(true)} style={{ display: "block" }}>
              <CreateIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleRemoveCard}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          {desc ? (
            <span className="todoCard__detail-icon" onClick={() => setShowModal(true)}>
              <i className="bx bx-detail"></i>
            </span>
          ) : null}
          <Box display="flex" justifyContent="flex-end">
            <AvatarGroup>
              {member &&
                member.map((value, index) => (
                  <Avatar src={value.image} key={index} alt={value.username} className={classes.smallAvatar} />
                ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );

  const renderModalWithDescCard = () => (
    <ReactModal isOpen={showModal} handleCloseModal={handleCloseModal}>
      <div className="todoCard-details">
        <Box mb={4}>
          <Typography variant="h4" component="h4">
            <i className="bx bx-layout"></i> Nội dung: {title}
          </Typography>
          <Typography variant="subtitle1" component="span">
            trong danh sách X
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box className={classes.todoCardLeft}>
            <Box className={classes.chkCompletedTodo}>
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={Boolean(completedTodo)} onChange={handleChangeCompletedCard} />
                }
                label="Hoàn thành công việc"
                className={classes.formControlLabel}
              />
            </Box>
            <Box className={classes.todoCardLabels}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <LabelIcon fontSize="large" /> {translate("label")}
                {date && (
                  <span className={classes.todoCardDeadline}>
                    <QueryBuilderIcon fontSize="large" />
                    {formatDate(date)}
                  </span>
                )}
              </Typography>
              <Box display="flex" mt={2} ml={2}>
                {label?.map(item => (
                  <div
                    key={item.value}
                    className="todoCard-details__labels-item"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </Box>
            </Box>
            <Box className={classes.todoCardMembers}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <GroupIcon fontSize="large" /> {translate("member")}
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={1.5}>
                {member.map(value => (
                  <Chip
                    className={classes.chipEl}
                    label={value.username}
                    color="secondary"
                    onDelete={() => handleRemoveMember(value._id)}
                  />
                ))}
              </Box>
            </Box>
            <Box className={classes.todoCardDescription}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <DescriptionIcon fontSize="large" /> {translate("description")}
              </Typography>
              {descCardContent && !isEditDescCard ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  onClick={() => setIsEditDescCard(true)}
                >
                  Chỉnh sửa
                </Button>
              ) : null}
              <Box pl={2.7} pt={2.7}>
                {isEditDescCard ? renderTextareaForDescModal() : <p>{descCardContent}</p>}
              </Box>
            </Box>
            <Box mt={3.4} className={classes.todoCardCheckList}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <PlaylistAddCheckIcon fontSize="large" /> {translate("checklist")}
              </Typography>
              {checklist.length > 0 ? (
                <Box mt={1.5}>
                  <CheckListSelect checklist={checklist} cardId={cardId} />
                </Box>
              ) : (
                <Typography variant="subtitle1" component="p" style={{ opacity: 0.6 }}>
                  Chưa có việc cần làm
                </Typography>
              )}
            </Box>
            <Box mt={3.8} className={classes.todoCardComments}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <ChatIcon fontSize="large" /> {translate("comment")}
              </Typography>
              <Comments comments={comments} cardId={cardId} />
              <InputComment cardId={cardId} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.btnMarginTop}
              onClick={handleUpdateCompletedTodo}
            >
              Lưu công việc
            </Button>
          </Box>
          <Box className={classes.todoCardRight}>
            <Typography variant="h4" component="h4">
              Thêm vào thẻ
            </Typography>
            <Box component="ul" mt={1.6}>
              <Box mt={1} component="li">
                <AccordionCpt title="member" icon="bx bx-user">
                  <Search cardId={cardId} />
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="label" icon="bx bx-label">
                  <Box width="100%">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Nhập tên nhãn công việc"
                      value={infoLabel.name}
                      onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                    />
                    <Box mt={1} mb={1.5}>
                      {labelColors.map((label, idx) => (
                        <Box display="flex" alignItems="center" position="relative" key={idx}>
                          <Radio
                            className={classes.todoCardRadioLabel}
                            name="labelcolor"
                            value={label}
                            onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                          />
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              height: "2rem",
                              backgroundColor: `${label}`,
                              display: "inline-block",
                              borderRadius: "4px"
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleAddLabelTodoCard}>
                      Thêm nhãn công việc
                    </Button>
                  </Box>
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="due_date" icon="bx bx-time">
                  <Box>
                    <Box mb={1.5}>
                      <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
                      />
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleAddDeadLineTodo}>
                      Thêm ngày deadline
                    </Button>
                  </Box>
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="checklist" icon="bx bx-pencil">
                  <Box width="100%">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Nhập việc cần làm"
                      value={todoCheckListContent}
                      onChange={todoCheckListContentChange}
                    />
                    <Box mt={1.5}>
                      <Button variant="contained" color="primary" onClick={handleAddCheckList}>
                        Thêm checklist
                      </Button>
                    </Box>
                  </Box>
                </AccordionCpt>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </ReactModal>
  );

  const renderContentModal = () => (
    <ReactModal isOpen={showModal} handleCloseModal={handleCloseModal}>
      <div className="todoCard-details">
        <div className="todoCard-details__title">
          <h3>
            <i className="bx bx-layout"></i> Nội dung: {title}
          </h3>
          <span>trong danh sách X</span>
        </div>
        <div className="todoCard-details__container">
          <div className="todoCard-details__left">
            <div className={classes.chkCompletedTodo}>
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={Boolean(completedTodo)} onChange={handleChangeCompletedCard} />
                }
                label="Hoàn thành công việc"
                className={classes.formControlLabel}
              />
            </div>
            <div className="todoCard-details__labels">
              <h3 className="todoCard-details__label">
                <i className="bx bx-label"></i> Nhãn công việc
                {date ? (
                  <span className="todoCard-details__deadline">
                    <i className="bx bx-time"></i>
                    {formatDate(date)}
                  </span>
                ) : null}
              </h3>
              <div className="todoCard-details__labels-list">
                {label?.map(item => (
                  <div
                    key={item.value}
                    className="todoCard-details__labels-item"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="todoCard-details__members">
              {member.length > 0 ? (
                <div className="todoCard-details__member">
                  <h3 className="todoCard-details__label">
                    <i className="bx bx-user"></i> Thành viên trong nhóm
                  </h3>
                  <div className="todoCard-details__member-list">
                    {member.map(value => (
                      <Chip
                        className={classes.chipEl}
                        label={value.username}
                        color="secondary"
                        onDelete={() => handleRemoveMember(value._id)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <h3 className="todoCard-details__label">
              <i className="bx bx-menu-alt-left"></i> {translate("description")}
            </h3>
            <div className="todoCard-details__edit">
              <TextArea placeholder="Thêm mô tả chi tiết" text={descCardContent} setText={setDescCardContent} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditDescCard}
                className={classes.btnMarginRight}
              >
                Lưu
              </Button>
              <Button variant="outlined">Hủy</Button>
            </div>
            <div className="todoCard-details__checklist">
              <h3>
                <i className="bx bx-list-check"></i> {translate("checklist")}
              </h3>
              {checklist?.length > 0 ? (
                <div className="todoCard-details__checklist-list">
                  <CheckListSelect checklist={checklist} cardId={cardId} />
                </div>
              ) : (
                <p style={{ opacity: 0.6 }}>Chưa có việc cần làm</p>
              )}
            </div>
            <div className="todoCard-details__comments">
              <h3 className="todoCard-details__label">
                <i className="bx bx-comment-detail"></i>
                Bình luận
              </h3>
              <Comments comments={comments} cardId={cardId} />
              <InputComment cardId={cardId} />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.btnMarginTop}
              onClick={handleUpdateCompletedTodo}
            >
              Lưu công việc
            </Button>
          </div>
          <div className="todoCard-details__right">
            <h3 className="todoCard-details__label">Thêm vào thẻ</h3>
            <ul className="todoCard-details__options">
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk0" id="chk0" />
                <label htmlFor="chk0" className="todoCard-details__item-label">
                  <i className="bx bx-user"></i> {translate("member")}
                </label>
                <div className="todoCard-details__item-content">
                  <Search cardId={cardId} />
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk1" id="chk1" />
                <label htmlFor="chk1" className="todoCard-details__item-label">
                  <i className="bx bx-label"></i> {translate("label")}
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Note label todo"
                    value={infoLabel.name}
                    onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                  />
                  {labelColors.map((value, index) => (
                    <div key={index}>
                      <input
                        key={index}
                        type="radio"
                        name="labelcolor"
                        value={value}
                        onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                      />
                      <span
                        style={{
                          width: "100%",
                          height: "2rem",
                          backgroundColor: `${value}`,
                          display: "inline-block",
                          marginLeft: ".9rem",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={handleAddLabelTodoCard}
                  >
                    Thêm
                  </Button>
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk2" id="chk2" />
                <label htmlFor="chk2" className="todoCard-details__item-label">
                  <i className="bx bx-time"></i> {translate("due_date")}
                </label>
                <div className="todoCard-details__item-content">
                  Chọn ngày:{" "}
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={handleAddDeadLineTodo}
                  >
                    Thêm
                  </Button>
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk3" id="chk3" />
                <label htmlFor="chk3" className="todoCard-details__item-label">
                  <i className="bx bx-pencil"></i> {translate("checklist")}
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Việc cần làm"
                    value={todoCheckListContent}
                    onChange={todoCheckListContentChange}
                  />
                  <Button variant="contained" color="primary" className={classes.margin} onClick={handleAddCheckList}>
                    Thêm
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ReactModal>
  );

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {provided => {
        return (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onDoubleClick={() => setShowModal(true)}
            className="todoCard__container"
          >
            {isEditing ? renderTextarea() : renderCard()}
            {desc ? renderModalWithDescCard() : renderContentModal()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default memo(TodoCard);
