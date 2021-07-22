import { Avatar, Divider, Fade, Menu, MenuItem } from '@material-ui/core';
import { useToggleMenus } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { getBoards } from 'selectors/todos.selector';
import useStyles from '../style';

const SubMemberTeam = ({ _id, username, image, email }) => {
  const classes = useStyles.apply();
  const getCurrBoardSelector = useSelector(getBoards);
  const [showSubTeamWork, toggleSubTeamWork, closeSubTeamWork] = useToggleMenus(null);

  return (
    <React.Fragment>
      <div className={classes.avatarMemberItem} onClick={toggleSubTeamWork} aria-controls={_id} aria-haspopup="true">
        <Avatar alt={username} src={image} className={classes.avatarMember} />
        {_id === getCurrBoardSelector[0]?.userId?._id && <i className="bx bx-chevrons-up avatar-icon"></i>}
      </div>
      <Menu
        id={_id}
        anchorEl={showSubTeamWork}
        keepMounted
        open={Boolean(showSubTeamWork)}
        onClose={closeSubTeamWork}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            width: '30rem',
            backgroundColor: '#FFFFFF',
          },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.subMenuMemberPermission}>
          <div className={classes.subMenuMemberInfo}>
            <Avatar alt={username} src={image} />
            <div className="submenu-member-title">
              <span className="username">{username}</span>
              <span>{email}</span>
            </div>
          </div>
          {_id === getCurrBoardSelector[0]?.userId?._id ? (
            <MenuItem className={classes.subMenuMemberAction}>
              Change permissions... <span>(Admin)</span>
            </MenuItem>
          ) : (
            <>
              <MenuItem className={classes.subMenuMemberAction}>
                Change permissions... <span>(Admin)</span>
              </MenuItem>
              <MenuItem className={classes.subMenuMemberAction}>Remove from board...</MenuItem>
            </>
          )}

          <Divider variant="middle" />
          <p className="submenu-member-textnote">
            You can't leave because you are the only admin. To make another user an admin, click thier avatar, select
            'Change permissions'
          </p>
        </div>
      </Menu>
    </React.Fragment>
  );
};

export default SubMemberTeam;
