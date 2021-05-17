import { Box, CardContent, Paper, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ChatIcon from "@material-ui/icons/Chat";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DescriptionIcon from "@material-ui/icons/Description";
import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import GroupIcon from "@material-ui/icons/Group";
import LabelIcon from "@material-ui/icons/Label";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PublishIcon from "@material-ui/icons/Publish";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { cardActions } from "actions/Todos/card.action";
import { labelActions } from "actions/Todos/label.action";
import AccordionCpt from "components/Accordion";
import DialogComponent from "components/ConfirmDialog";
import ReactModal from "components/Modal";
import Search from "components/Search";
import showToast from "components/Toast";
import { labelColors } from "configs/fakeLabel";
import { useInput } from "hooks";
import moment from "moment";
import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectorErrorTodoCard } from "selectors/todos.selector";
import { v4 as uuidv4 } from "uuid";
import { CheckListSelect } from "../TodoCheckList";
import TodoForm from "../TodoForm";
import Comments from "./Comment";
import InputComment from "./Comment/InputComment";
import useStyles from "./theme.todoCard";
import "./todoCard.scss";

function TodoCard(props) {
  const { title, cardId, member = [], checklist, index, listId, desc, label, date, completed, attachments } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { boardId } = useParams();
  const { t: translate } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDescCard, setIsEditDescCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedList, setExpandedList] = useState(null);
  const [cardContent, setCardContent] = useState(title);
  const [descCardContent, setDescCardContent] = useState(desc);
  const [todoCheckListContent, todoCheckListContentChange, reset] = useInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [infoLabel, setInfoLabel] = useState({ name: "", color: "" });
  const [completedTodo, setCompletedTodo] = useState(completed);
  const [showAttach, setShowAttach] = useState(false);
  const [attachItem, setAttachItem] = useState(null);
  const [dataDialog, setDataDialog] = useState(null);
  const error = useSelector(selectorErrorTodoCard);

  const handleCloseForm = () => {
    setIsEditing(false);
    setAnchorEl(null);
  };

  const handleShowPopup = (event, data) => {
    setExpandedList(expandedList ? null : event.currentTarget);
    setDataDialog(data);
  };

  const closeExpandedPopup = () => setExpandedList(null);

  const handleShowSubMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggleShowAttach = attach => {
    setAttachItem(attach);
    setShowAttach(prev => !prev);
  };

  const handleToggleSubMenu = () => {
    setAnchorEl(prev => !prev);
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
    dispatch(labelActions.asyncAddLabelTodo(cardId, newLabelTodo));
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

  const handleRemoveLabel = labelId => {
    dispatch(labelActions.asyncRemoveLabelTodo(cardId, labelId));
  };

  const onChange = useCallback(e => {
    setCardContent(e.target.value);
  }, []);

  const handleChangeDescCard = useCallback(e => {
    setDescCardContent(e.target.value);
  }, []);

  const handleChangeCompletedCard = e => {
    setCompletedTodo(e.target.checked);
  };

  const handleUpdateCompletedTodo = () => {
    dispatch(cardActions.asyncUpdateCompletedTodoCard(cardId, completedTodo, boardId));
  };

  const onAddAttachTodo = event => {
    const value = `attackItem-${uuidv4()}`;
    const newAttach = {
      value,
      item: event.target.files[0]
    };
    dispatch(cardActions.asyncAddAttachTodoCard(cardId, newAttach));
    if (error) showToast(error, "error");
  };

  const handleRemoveAttachTodo = attachId => {
    dispatch(cardActions.asyncRemoveAttachTodoCard(cardId, attachId));
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
    <Paper elevation={0} className={classes.paper}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          {label?.length > 0 ? (
            <Box mb={1} className={classes.box}>
              {label?.map((value, index) => (
                <Chip
                  classes={{ root: classes.chipTags }}
                  key={index}
                  label={value?.name}
                  style={{ backgroundColor: `${value.color}` }}
                />
              ))}
            </Box>
          ) : null}
          <div className={classes.box}>
            <Typography className={classes.title} variant="body2" component="p">
              {title}
            </Typography>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleShowSubMenu}>
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleToggleSubMenu}
              TransitionComponent={Fade}
              PaperProps={{
                style: {
                  width: "20rem",
                  backgroundColor: "#FFFFFF"
                }
              }}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              <MenuItem className={classes.menuItem} onClick={() => setIsEditing(true)}>
                <CreateIcon /> Edit Task
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleRemoveCard}>
                <DeleteOutlineIcon /> Delete Task
              </MenuItem>
            </Menu>
          </div>
          {desc ? (
            <span className="todoCard__detail-icon" onClick={() => setShowModal(true)}>
              <i className="bx bx-detail"></i>
            </span>
          ) : null}
          {!showAttach ? (
            <div className={classes.cardIcon}>
              <AttachFileIcon />
              <span>{attachments?.length}</span>
            </div>
          ) : (
            <div
              className={classes.attachments}
              style={{
                backgroundImage: `url(${attachItem})`,
                backgroundSize: "cover"
              }}
            ></div>
          )}
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            {date ? (
              <div className={classes.dueDate}>
                <AccessTimeIcon />
                <span>{moment(date).format("MMM DD")}</span>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <AvatarGroup>
                {member &&
                  member.map((value, index) => (
                    <Avatar src={value.image} key={index} alt={value.username} className={classes.smallAvatar} />
                  ))}
              </AvatarGroup>
            </div>
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
                    {moment(date).format("DD/MM/YYYY")}
                  </span>
                )}
              </Typography>
              <Box display="flex" mt={2} ml={2}>
                {label?.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.name}
                    style={{ backgroundColor: `${item.color}` }}
                    className={classes.label}
                    onDelete={() => handleRemoveLabel(item.value)}
                  />
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
            {attachments?.length > 0 && (
              <Box mt={3.4} className={classes.todoCardCheckList}>
                <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                  <AttachFileIcon fontSize="large" /> Attachments
                </Typography>
                {attachments?.map(m => (
                  <div key={m.id} className={classes.attachmentIem}>
                    <div
                      className={classes.attachmentImg}
                      style={{
                        backgroundImage: `url(${m.item})`,
                        backgroundSize: "cover"
                      }}
                    ></div>
                    <div className={classes.attachmentContent}>
                      <Typography variant="h6" component="h6" gutterBottom>
                        {m.name}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Button
                          classes={{ root: classes.attachmentBtn }}
                          startIcon={<FeaturedVideoIcon />}
                          onClick={() => handleToggleShowAttach(m.item)}
                          disableRipple
                        >
                          Make cover
                        </Button>
                        <span>
                          <LinearScaleIcon />
                        </span>
                        <Button
                          aria-describedby={m.id}
                          disableRipple
                          classes={{ root: classes.attachmentBtn }}
                          onClick={e => handleShowPopup(e, m)}
                        >
                          {translate("remove")}
                        </Button>
                        {dataDialog?.id === m.id ? (
                          <DialogComponent
                            id={m.id}
                            anchorEl={expandedList}
                            open={Boolean(expandedList)}
                            handleClickAway={closeExpandedPopup}
                            content={m.name}
                            onClick={() => handleRemoveAttachTodo(m.id)}
                          />
                        ) : null}
                      </Box>
                    </div>
                  </div>
                ))}
              </Box>
            )}
            <Box mt={3.8} className={classes.todoCardComments}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <ChatIcon fontSize="large" /> {translate("comment")}
              </Typography>
              <Comments cardId={cardId} />
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
                  <Box width="91%">
                    <TextField
                      className={classes.textFieldLabel}
                      fullWidth
                      size="small"
                      label="Nhập tên nhãn công việc"
                      value={infoLabel.name}
                      onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                    />
                    <Box mt={2} mb={2.5} display="flex" alignItems="baseline">
                      <FormControl>
                        <FormLabel>Color</FormLabel>
                        <RadioGroup
                          aria-label="labelcolor"
                          name="labelcolor"
                          value={infoLabel.color}
                          onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                        >
                          <Box mt={1} display="flex" alignItems="center" position="relative" key={index}>
                            {labelColors.map((label, index) => (
                              <Box position="relative">
                                <Radio
                                  disableRipple
                                  value={label}
                                  classes={{ root: classes.radio, checked: classes.checked }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "2px",
                                    top: "3px",
                                    right: 0,
                                    width: "3rem",
                                    height: "3rem",
                                    backgroundColor: `${label}`,
                                    display: "inline-block",
                                    borderRadius: "50%"
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </RadioGroup>
                      </FormControl>
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
              <Box mt={1} component="li">
                <AccordionCpt title="attach" icon="bx bx-link-alt">
                  <Box width="100%">
                    <Typography variant="h6" component="h6" align="center">
                      Attach From
                    </Typography>
                    <label className={classes.attachmentInput} htmlFor="attach-computer">
                      <PublishIcon />
                      <span>Computer</span>
                    </label>
                    <input
                      type="file"
                      name="attach-computer"
                      id="attach-computer"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={event => onAddAttachTodo(event)}
                    />
                    {/* <div>
                      <input type="text" placeholder="Link ..." />
                    </div> */}
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
            <div className={classes.chkCompletedTodo}>
              <FormControlLabel
                control={
                  <Checkbox size="medium" checked={Boolean(completedTodo)} onChange={handleChangeCompletedCard} />
                }
                label="Hoàn thành công việc"
                className={classes.formControlLabel}
              />
            </div>
            <Box className={classes.todoCardLabels}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <LabelIcon fontSize="large" /> {translate("label")}
                {date && (
                  <span className={classes.todoCardDeadline}>
                    <QueryBuilderIcon fontSize="large" />
                    {moment(date).format("DD/MM/YYYY")}
                  </span>
                )}
              </Typography>
              <Box display="flex" mt={2} ml={2}>
                {label?.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.name}
                    style={{ backgroundColor: `${item.color}` }}
                    className={classes.label}
                    onDelete={() => handleRemoveLabel(item.value)}
                  />
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
              <Box pt={2.8} pl={3.5}>
                <TextareaAutosize
                  className={classes.todoCardTextarea}
                  placeholder="Thêm mô tả chi tiết"
                  value={descCardContent}
                  onChange={handleChangeDescCard}
                  rowsMin={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditDescCard}
                  className={classes.btnMarginRight}
                >
                  Lưu
                </Button>
                <Button variant="outlined">Hủy</Button>
              </Box>
            </Box>
            <Box mt={3.4} className={classes.todoCardCheckList}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <PlaylistAddCheckIcon fontSize="large" /> {translate("checklist")}
              </Typography>
              {checklist?.length > 0 ? (
                <Box mt={1.5}>
                  <CheckListSelect checklist={checklist} cardId={cardId} />
                </Box>
              ) : (
                <Typography variant="subtitle1" component="p" style={{ opacity: 0.6 }}>
                  Chưa có việc cần làm
                </Typography>
              )}
            </Box>
            {attachments?.length > 0 && (
              <Box mt={3.4} className={classes.todoCardCheckList}>
                <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                  <AttachFileIcon fontSize="large" /> Attachments
                </Typography>
                {attachments?.map(m => (
                  <div key={m.id} className={classes.attachmentIem}>
                    <div
                      className={classes.attachments}
                      style={{
                        backgroundImage: `url(${m.item})`,
                        backgroundSize: "cover"
                      }}
                    ></div>
                    <div className={classes.attachmentContent}>
                      <Typography variant="h6" component="h6" gutterBottom>
                        {m.name}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Button
                          classes={{ root: classes.attachmentBtn }}
                          startIcon={<FeaturedVideoIcon />}
                          onClick={() => handleToggleShowAttach(m.item)}
                          disableRipple
                        >
                          Make cover
                        </Button>
                        <span>
                          <LinearScaleIcon />
                        </span>
                        <Button classes={{ root: classes.attachmentBtn }}>Delete</Button>
                      </Box>
                    </div>
                  </div>
                ))}
              </Box>
            )}
            <Box mt={3.8} className={classes.todoCardComments}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <ChatIcon fontSize="large" /> {translate("comment")}
              </Typography>
              <Comments cardId={cardId} />
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
                  <Box width="91%">
                    <TextField
                      className={classes.textFieldLabel}
                      fullWidth
                      size="small"
                      label="Nhập tên nhãn công việc"
                      value={infoLabel.name}
                      onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                    />
                    <Box mt={2} mb={2.5} display="flex" alignItems="baseline">
                      <FormControl>
                        <FormLabel>Color</FormLabel>
                        <RadioGroup
                          aria-label="labelcolor"
                          name="labelcolor"
                          value={infoLabel.color}
                          onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                        >
                          <Box mt={1} display="flex" alignItems="center" position="relative" key={index}>
                            {labelColors.map((label, index) => (
                              <Box position="relative">
                                <Radio
                                  disableRipple
                                  value={label}
                                  classes={{ root: classes.radio, checked: classes.checked }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "2px",
                                    top: "3px",
                                    right: 0,
                                    width: "3rem",
                                    height: "3rem",
                                    backgroundColor: `${label}`,
                                    display: "inline-block",
                                    borderRadius: "50%"
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </RadioGroup>
                      </FormControl>
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
              <Box mt={1} component="li">
                <AccordionCpt title="attach" icon="bx bx-link-alt">
                  <Box width="100%">
                    <Typography variant="h6" component="h6" align="center">
                      Attach From
                    </Typography>
                    <label className={classes.attachmentInput} htmlFor="attach-computer">
                      <PublishIcon />
                      <span>Computer</span>
                    </label>
                    <input
                      type="file"
                      name="attach-computer"
                      id="attach-computer"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={event => onAddAttachTodo(event)}
                    />
                    {/* <div>
                      <input type="text" placeholder="Link ..." />
                    </div> */}
                  </Box>
                </AccordionCpt>
              </Box>
            </Box>
          </Box>
        </Box>
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
          >
            {isEditing ? renderTextarea() : renderCard()}
            {desc ? renderModalWithDescCard() : renderContentModal()}
          </div>
        );
      }}
    </Draggable>
  );
}

TodoCard.propTypes = {
  title: PropTypes.string,
  member: PropTypes.array,
  checklist: PropTypes.array,
  attachments: PropTypes.array,
  desc: PropTypes.string,
  label: PropTypes.array,
  comments: PropTypes.array
};

export default memo(TodoCard);
