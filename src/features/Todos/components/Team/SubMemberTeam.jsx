import { Avatar, Divider, MenuItem } from '@material-ui/core';
import PopupMenu from 'components/PopupMenu';
import { useToggle, useToggleMenus } from 'hooks';
import React, { useEffect, useState } from 'react';
import RoleTeam from './RoleTeam';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from 'selectors/todos.selector';
import useStyles from '../../style';
import DialogComponent from 'components/ConfirmDialog';
import { boardActions } from 'actions/Todos/board.action';

const SubMemberTeam = ({ _id, username, image, email }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getCurrBoardSelector = useSelector(getBoards);
  const [roleMember, setRoleMember] = useState({});
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [showSubTeamWork, toggleSubTeamWork, closeSubTeamWork] =
    useToggleMenus(null);
  const [showSubPermission, toggleSubPermisstion] = useToggle(false);

  useEffect(() => {
    if (_id === getCurrBoardSelector[0]?.userId?._id) {
      setRoleMember({ type: 'admin', id: _id });
    } else {
      setRoleMember({ type: 'member', id: _id });
    }
  }, [_id]);

  const handleShowPermissions = () => {
    toggleSubPermisstion();
    closeSubTeamWork();
  };

  const handleChangeRoleMember = (role) => {
    setRoleMember({
      ...roleMember,
      type: role.type,
    });
  };

  const handleRemoveMemberProject = () => {
    const boardId = getCurrBoardSelector[0]?._id;
    dispatch(boardActions.asyncRemoveMemberProject(boardId, _id));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={classes.avatarMemberItem}
        onClick={toggleSubTeamWork}
        aria-controls={_id}
        aria-haspopup="true"
      >
        <Avatar alt={username} src={image} className={classes.avatarMember} />
        {_id === getCurrBoardSelector[0]?.userId?._id && (
          <i className="bx bx-chevrons-up avatar-icon"></i>
        )}
      </div>

      {showSubPermission ? (
        <RoleTeam
          role={roleMember}
          onClose={toggleSubPermisstion}
          onChangeRole={handleChangeRoleMember}
        />
      ) : (
        <PopupMenu
          id={_id}
          width="35rem"
          showPopup={showSubTeamWork}
          closePopup={closeSubTeamWork}
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
              <MenuItem
                className={classes.subMenuMemberAction}
                onClick={handleShowPermissions}
              >
                Change permissions <span>({roleMember?.type})</span>
              </MenuItem>
            ) : (
              <>
                <MenuItem
                  className={classes.subMenuMemberAction}
                  onClick={handleShowPermissions}
                >
                  Change permissions... <span>({roleMember?.type})</span>
                </MenuItem>
                <MenuItem
                  className={classes.subMenuMemberAction}
                  onClick={() => setShowConfirmRemove(true)}
                >
                  Remove from board...
                </MenuItem>
                <DialogComponent
                  id={_id}
                  content={username}
                  onClick={handleRemoveMemberProject}
                  open={showConfirmRemove}
                  handleClickAway={setShowConfirmRemove}
                />
              </>
            )}

            <Divider variant="middle" />
            <p className="submenu-member-textnote">
              You can't leave because you are the only admin. To make another
              user an admin, click thier avatar, select 'Change permissions'
            </p>
          </div>
        </PopupMenu>
      )}
    </div>
  );
};

export default SubMemberTeam;
