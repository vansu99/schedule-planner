import { Box, Card, CardContent, Chip, Fade, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useToggleMenus } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../theme.todoCard';

const TodoCardItem = ({
  title,
  label,
  date,
  member,
  description,
  showAttach,
  attachItem,
  attachments,
  onEditTitleCard,
  onRemoveCard,
}) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const [showSubMenus, toggleSubMenus, closeSubMenus] = useToggleMenus(null);

  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.paper}>
        <Card variant="outlined" className={classes.cardContainer}>
          <CardContent>
            {label?.length > 0 ? (
              <Box mb={1} className={classes.box}>
                {(label || []).map((value, index) => (
                  <Chip
                    classes={{ root: classes.chipTags }}
                    key={value.color}
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
              <IconButton aria-controls="long-menu" aria-haspopup="true" onClick={toggleSubMenus}>
                <MoreVertIcon fontSize="inherit" />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={showSubMenus}
                keepMounted
                open={Boolean(showSubMenus)}
                onClose={closeSubMenus}
                TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    width: '20rem',
                    backgroundColor: '#FFFFFF',
                  },
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem className={classes.menuItem} onClick={onEditTitleCard}>
                  <CreateIcon /> Edit Task
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={onRemoveCard}>
                  <DeleteOutlineIcon /> Delete Task
                </MenuItem>
              </Menu>
            </div>
            {description ? (
              <span className="todoCard__detail-icon">
                <i className="bx bx-detail"></i>
              </span>
            ) : null}
            {showAttach && (
              <div
                className={classes.attachments}
                style={{
                  backgroundImage: `url(${attachItem})`,
                  backgroundSize: 'cover',
                }}
              ></div>
            )}
            {attachments?.length > 1 && (
              <div className={classes.cardIcon}>
                <AttachFileIcon />
                <span>{attachments?.length}</span>
              </div>
            )}
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              {date ? (
                <div className={classes.dueDate}>
                  <AccessTimeIcon />
                  {/* <span>{moment(date).format("MMM DD")}</span> */}
                  <span>{translate('date_format', { datetime: date })}</span>
                </div>
              ) : (
                <div></div>
              )}
              <div>
                <AvatarGroup>
                  {(member || []).map((value, index) => (
                    <Avatar src={value.image} key={index} alt={value.username} className={classes.smallAvatar} />
                  ))}
                </AvatarGroup>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </React.Fragment>
  );
};

export default TodoCardItem;
