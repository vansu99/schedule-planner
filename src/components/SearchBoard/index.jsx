import { fade, makeStyles, Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { boardsApis } from 'apis';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  searchBoard: {
    '& .MuiFormControl-marginNormal': {
      margin: 0,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  autocomplete: {
    position: 'absolute',
    left: 0,
    top: '4rem',
    right: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
    padding: theme.spacing(2),
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    '& ul li:not(:last-child)': {
      marginBottom: '5px',
    },
    color: theme.palette.text.primary,
    '& ul li > a': {
      display: 'block',
      color: theme.palette.text.primary,
      fontSize: '1.6rem',
      '&:hover': {
        color: '#EB5757',
      },
    },
  },
}));

function SearchBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [boards, setBoards] = useState([]);
  const typingTimeoutRef = useRef(null);
  const [msg, setMsg] = useState('');

  const handleChangeSearch = ev => {
    setOpen(true);
    setSearch(ev.target.value);

    if (!handleFilterBoard) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: ev.target.value,
      };
      handleFilterBoard(formValues);
    }, 500);
  };

  const handleFilterBoard = async ({ searchTerm }) => {
    const result = await boardsApis.searchBoard(searchTerm);
    if (result.data.boards) {
      setBoards([...result.data.boards]);
      setMsg('')
    } else {
      setBoards([])
      setMsg(result.data.msg);
    }
  };

  const handleClickAway = () => {
    setOpen(false);
    setBoards([]);
    setMsg('');
  };

  return (
    <div className={classes.searchBoard}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon fontSize="large" />
          </div>
          <InputBase
            placeholder="Search project…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={search}
            onChange={handleChangeSearch}
            autoFocus
            inputProps={{ 'aria-label': 'search' }}
          />
          {!!boards.length && open ? (
            <div className={classes.autocomplete}>
              <ul>
                {boards.map(board => {
                  return (
                    <li key={board._id}>
                      <Link
                        to={`/todos/${board._id}/${board.slug}`}
                        onClick={() => {
                          setSearch('');
                          setOpen(false);
                        }}
                      >
                        {board.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {!!msg && <div className={classes.autocomplete}>
            <Typography variant="body2" component="p">
              {msg}
            </Typography>
          </div>}
        </div>
      </ClickAwayListener>
    </div>
  );
}

SearchBoard.propTypes = {};

export default React.memo(SearchBoard);
