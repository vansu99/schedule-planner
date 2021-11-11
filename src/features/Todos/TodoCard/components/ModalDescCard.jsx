import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import GroupIcon from '@material-ui/icons/Group';
import LabelIcon from '@material-ui/icons/Label';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PublishIcon from '@material-ui/icons/Publish';
import { DateTimePicker } from '@material-ui/pickers';
import { cardActions } from 'actions/Todos/card.action';
import { labelActions } from 'actions/Todos/label.action';
import AccordionCpt from 'components/Accordion';
import Avatar from 'components/Avatar';
import DialogComponent from 'components/ConfirmDialog';
import CustomDateTimePicker from 'components/CustomDatePicker';
import ReactModal from 'components/Modal';
import { labelColors } from 'configs/fakeLabel';
import TodoForm from 'features/Todos/TodoForm';
import { useInput, useToggleMenus } from 'hooks';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from 'selectors/todos.selector';
import { v4 as uuidv4 } from 'uuid';
import { CheckListSelect } from '../../TodoCheckList';
import Comments from '../Comment';
import InputComment from '../Comment/InputComment';
import useStyles from '../theme.todoCard';
import Search from '../../../../components/Search';
import ReactMarkdown from 'react-markdown';

const RenderModalWithDescCard = ({
  onToggleCoverAttack,
  onShowEditDescCard,
  onRemoveDueDate,
  onEditDescCard,
  descCardContent,
  onRemoveMember,
  onRemoveLabel,
  onEditDueDate,
  onShowModal,
  isEditDescCard,
  attachments,
  checklist,
  listTitle,
  showModal,
  completed,
  member,
  title,
  boardId,
  label,
  date,
  index,
  _id,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const getCurrBoard = useSelector(getBoards);
  const [showDialog, toggleShowDialog, closeDialog] = useToggleMenus(null);
  const [startDate, setStartDate] = useState(new Date());
  const [completedTodo, setCompletedTodo] = useState(completed);
  const [infoLabel, setInfoLabel] = useState({ name: '', color: '' });
  const [todoCheckListContent, todoCheckListContentChange, reset] = useInput('');

  const handleRemoveAttachTodo = attachId => {
    dispatch(cardActions.asyncRemoveAttachTodoCard(_id, attachId));
  };

  const handleUpdateCompletedTodo = () => {
    dispatch(cardActions.asyncUpdateCompletedTodoCard(_id, completedTodo, boardId));
  };

  const handleAddMemberProject = user => {
    dispatch(cardActions.asyncAddMemberTodoCard(_id, user));
  };

  const handleAddLabelTodoCard = () => {
    const value = `label-${uuidv4()}`;
    const newLabelTodo = {
      ...infoLabel,
      value,
    };
    if (infoLabel.name !== '') {
      dispatch(labelActions.asyncAddLabelTodo(_id, newLabelTodo));
    }

    setInfoLabel({
      name: '',
      color: '',
    });
  };

  const handleAddCheckList = () => {
    const value = `cklist-${uuidv4()}`;
    const newCheckListTodo = {
      value,
      text: todoCheckListContent,
      status: false,
    };
    dispatch(cardActions.asyncAddCheckListCard(_id, newCheckListTodo));
    reset();
  };

  const onAddAttachTodo = event => {
    const value = `attackItem-${uuidv4()}`;
    const newAttach = {
      value,
      item: event.target.files[0],
    };
    dispatch(cardActions.asyncAddAttachTodoCard(_id, newAttach));
    //if (error) showToast(error, 'error');
  };

  const handleAddDeadLineTodo = () => {
    dispatch(cardActions.asyncAddDeadlineTodoCard(_id, startDate));
  };

  return (
    <ReactModal isOpen={showModal} handleCloseModal={onShowModal}>
      <div className="todoCard-details">
        <Box mb={4}>
          <Typography variant="h4" component="h4">
            <i className="bx bx-layout" /> {translate('content')}: {title}
          </Typography>
          <Typography variant="body2" component="span">
            {translate('in_list')} {listTitle}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box className={classes.todoCardLeft}>
            <Box className={classes.chkCompletedTodo}>
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    size="medium"
                    checked={Boolean(completedTodo)}
                    onChange={e => setCompletedTodo(e.target.checked)}
                  />
                }
                label={translate('completed_task')}
                className={classes.formControlLabel}
              />
            </Box>
            {label?.length !== 0 ? (
              <Box className={classes.todoCardLabels}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                    <LabelIcon fontSize="large" /> {translate('label')}
                  </Typography>
                </Box>
                <Box display="flex" mt={2} ml={2}>
                  {(label || []).map(item => (
                    <Chip
                      key={item.color}
                      label={item.name}
                      style={{ backgroundColor: `${item.color}` }}
                      className={classes.label}
                      onDelete={() => onRemoveLabel(item.value)}
                    />
                  ))}
                </Box>
              </Box>
            ) : null}
            {!!date ? (
              <Box className={classes.todoCardDueDate}>
                <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                  <AccessAlarmsIcon fontSize="large" /> {translate('due_date')}
                </Typography>
                <div className={classes.dueDateBox}>
                  <CustomDateTimePicker dueDate={date} onSubmit={onEditDueDate} />
                  <div className={classes.dueDateAction}>
                    <IconButton disableRipple onClick={onRemoveDueDate}>
                      <DeleteOutlineIcon fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              </Box>
            ) : null}
            <Box className={classes.todoCardMembers}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <GroupIcon fontSize="large" /> {translate('member')}
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={1.5}>
                {(member || []).map(value => (
                  <Chip
                    key={value._id}
                    className={classes.chipEl}
                    label={value.username}
                    color="secondary"
                    onDelete={() => onRemoveMember(value._id)}
                  />
                ))}
              </Box>
            </Box>
            <Box className="todoCardDescription">
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <DescriptionIcon fontSize="large" /> {translate('description')}
              </Typography>
              {descCardContent && !isEditDescCard ? (
                <Button
                  variant="contained"
                  color="primary"
                  disableRipple
                  className={classes.margin}
                  onClick={onShowEditDescCard}
                >
                  {translate('change')}
                </Button>
              ) : null}
              <Box pl={2.7}>
                {isEditDescCard ? (
                  <TodoForm
                    onCloseForm={onShowEditDescCard}
                    text={descCardContent}
                    name="description"
                    submit={onEditDescCard}
                    label="Save"
                  />
                ) : (
                  <ReactMarkdown>{descCardContent}</ReactMarkdown>
                )}
              </Box>
            </Box>
            <Box mt={3.4} className={classes.todoCardCheckList}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <PlaylistAddCheckIcon fontSize="large" /> {translate('checklist')}
              </Typography>
              {checklist.length > 0 ? (
                <Box mt={1.5}>
                  <CheckListSelect checklist={checklist} cardId={_id} />
                </Box>
              ) : (
                <Typography
                  variant="subtitle1"
                  component="p"
                  style={{ opacity: 0.6, padding: '10px 0 0 25px', fontSize: '15px' }}
                >
                  Chưa có việc cần làm
                </Typography>
              )}
            </Box>
            {attachments?.length > 0 && (
              <Box mt={3.4} className={classes.todoCardCheckList}>
                <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                  <AttachFileIcon fontSize="large" /> {translate('attach')}
                </Typography>
                {(attachments || []).map(m => (
                  <div key={m.id} className={classes.attachmentIem}>
                    <div
                      className={classes.attachmentImg}
                      style={{
                        backgroundImage: `url(${m.item})`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <div className={classes.attachmentContent}>
                      <Typography variant="h6" component="h6" gutterBottom>
                        {m.name}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Button
                          classes={{ root: classes.attachmentBtn }}
                          startIcon={<FeaturedVideoIcon />}
                          onClick={() => onToggleCoverAttack(m.item)}
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
                          onClick={toggleShowDialog}
                        >
                          {translate('remove')}
                        </Button>
                        <DialogComponent
                          id={m.id}
                          anchorEl={showDialog}
                          open={Boolean(showDialog)}
                          handleClickAway={closeDialog}
                          content={m.name}
                          onClick={() => handleRemoveAttachTodo(m.id)}
                        />
                      </Box>
                    </div>
                  </div>
                ))}
              </Box>
            )}
            <Box mt={3.8} className={classes.todoCardComments}>
              <Typography variant="h5" component="h5" className={classes.todoCardTitle}>
                <ChatIcon fontSize="large" /> {translate('comment')}
              </Typography>
              <Comments cardId={_id} />
              <InputComment cardId={_id} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              disableRipple
              className={classes.btnMarginTop}
              onClick={handleUpdateCompletedTodo}
            >
              {translate('save')}
            </Button>
          </Box>
          <Box className={classes.todoCardRight}>
            <Typography variant="h4" component="h4">
              {translate('add_to_card')}
            </Typography>
            <Box component="ul" mt={1.6}>
              <Box mt={1} component="li">
                <AccordionCpt title="member" icon="bx bx-user">
                  <Search cardId={_id} />
                  <div className={classes.members}>
                    {getCurrBoard[0]?.member?.map(mem => (
                      <div key={mem?._id} className="member-item">
                        <Avatar src={mem?.image} alt={mem?.username} />
                        <span style={{ paddingLeft: '0.8rem' }}>{mem?.username}</span>
                        <IconButton disableRipple onClick={() => handleAddMemberProject(mem?._id)}>
                          <AddBoxIcon />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="label" icon="bx bx-label">
                  <Box width="91%">
                    <TextField
                      className={classes.textFieldLabel}
                      fullWidth
                      size="small"
                      label={translate('label_place')}
                      value={infoLabel.name}
                      onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                    />
                    <Box mt={2} mb={2.5} display="flex" alignItems="baseline">
                      <FormControl>
                        <FormLabel className={classes.formLabel}>Color</FormLabel>
                        <RadioGroup
                          aria-label="labelcolor"
                          name="labelcolor"
                          value={infoLabel.color}
                          onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                        >
                          <Box
                            mt={1}
                            display="flex"
                            alignItems="center"
                            position="relative"
                            key={index}
                          >
                            {labelColors.map((label, index) => (
                              <Box position="relative" key={index}>
                                <Radio
                                  disableRipple
                                  value={label}
                                  classes={{ root: classes.radio, checked: classes.checked }}
                                />
                                <span
                                  style={{
                                    position: 'absolute',
                                    left: '2px',
                                    top: '3px',
                                    right: 0,
                                    width: '3rem',
                                    height: '3rem',
                                    backgroundColor: `${label}`,
                                    display: 'inline-block',
                                    borderRadius: '50%',
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    <Button
                      disableRipple
                      variant="contained"
                      color="primary"
                      onClick={handleAddLabelTodoCard}
                    >
                      {translate('create_label')}
                    </Button>
                  </Box>
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="due_date" icon="bx bx-time">
                  <Box>
                    <Box mb={1.5}>
                      <DateTimePicker
                        value={startDate}
                        onChange={date => setStartDate(date)}
                        format="dd/MM/yyyy HH:mm"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton disableRipple>
                                <AlarmIcon fontSize="large" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Button
                      disableRipple
                      variant="contained"
                      color="primary"
                      onClick={handleAddDeadLineTodo}
                    >
                      {translate('save')}
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
                      label={translate('checklist_place')}
                      className={classes.textFieldLabel}
                      value={todoCheckListContent}
                      onChange={todoCheckListContentChange}
                    />
                    <Box mt={1.5}>
                      <Button
                        disableRipple
                        variant="contained"
                        color="primary"
                        onClick={handleAddCheckList}
                      >
                        {translate('add')}
                      </Button>
                    </Box>
                  </Box>
                </AccordionCpt>
              </Box>
              <Box mt={1} component="li">
                <AccordionCpt title="attach" icon="bx bx-link-alt">
                  <Box width="100%">
                    <Typography variant="h6" component="h6" align="center">
                      {translate('attach_from')}
                    </Typography>
                    <label className={classes.attachmentInput} htmlFor="attach-computer">
                      <PublishIcon />
                      <span>{translate('computer')}</span>
                    </label>
                    <input
                      type="file"
                      name="attach-computer"
                      id="attach-computer"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => onAddAttachTodo(e)}
                    />
                  </Box>
                </AccordionCpt>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </ReactModal>
  );
};

export default RenderModalWithDescCard;
