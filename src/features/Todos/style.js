import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: 'calc(100vh - 50px)',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    padding: '10px 10px 0',
    position: 'relative',
  },
  titleIcon: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
    color: theme.palette.text.primary,
  },
  btn: {
    width: '120px',
    height: '32px',
    lineHeight: '32px',
    fontWeight: 500,
    fontSize: '1.2rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'capitalize',
    border: '0',
    padding: 0,
  },
  todosWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
    paddingBottom: '2rem',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#dadada',
      borderRadius: '10px',
    },
  },
  todoInfoTopLeft: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  todoTopOwner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3rem',
    '& > img': {
      width: '3.5rem',
      height: '3.5rem',
      objectFit: 'cover',
      borderRadius: '3.5rem',
    },
  },
  todoTopOwnerInfo: {
    marginLeft: '0.8rem',
    lineHeight: 1.4,
    '& > p': {
      fontWeight: '600',
      fontSize: '1.4rem',
      fontFamily: 'Roboto, sans-serif',
    },
    '& > span': {
      fontWeight: 400,
      fontSize: '1.3rem',
      fontFamily: 'Roboto, sans-serif',
      color: '#6f7782',
    },
  },
  todoInfoTopMembers: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 auto',
    marginRight: '3rem',
    '& .member-invite': {
      marginLeft: '1rem',
    },
  },
  memberInviteContent: {
    minHeight: '20rem',
    '& .member-content-title': {
      padding: '0 1rem 0.6rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > h4': {
        fontWeight: 400,
        fontSize: '1.6rem',
      },
    },
    '& .member-content-search': {
      padding: '1rem',
      textAlign: 'center',
    },
  },
  avatarMemberItem: {
    position: 'relative',
    border: 0,
    cursor: 'pointer',
    '& .avatar-icon': {
      position: 'absolute',
      right: '2px',
      bottom: '-4px',
      color: '#fff',
      fontSize: '1.7rem',
    },
  },
  avatarMember: {
    width: '3.5rem',
    height: '3.5rem',
  },
  subMenuMemberPermission: {
    display: 'flex',
    flexDirection: 'column',
    '& .submenu-member-textnote': {
      fontSize: '1.5rem',
      fontWeight: 300,
      padding: '1rem 1.5rem 0 1.5rem',
      color: '#9c9a9a',
    },
  },
  subMenuMemberAction: {
    fontWeight: 400,
    '& span': {
      paddingLeft: '1.5rem',
      color: '#9c9a9a',
      fontWeight: 300,
    },
  },
  subMenuMemberInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    marginBottom: '1.5rem',
    '& .submenu-member-title': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '1.5rem',
      '& .username': {
        fontWeight: 600,
        fontSize: '1.8rem',
      },
    },
  },
  todoInfoTopRight: {},
}));

export default useStyles;
