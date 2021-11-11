import { cardActions } from 'actions/Todos/card.action';
import { CheckBox } from 'components/FormControls';
import { makeStyles } from '@material-ui/core';
import LinearWithValueLabel from 'components/ProgressBar';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  btnMarginTop: {
    marginTop: theme.spacing(1),
  },
}));

function CheckListSelect({ checklist, cardId }) {
  const { t: translate } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checkedValues, setCheckedValues] = useState([]);
  const [completedPercent, setCompletedPercent] = useState({});

  useEffect(() => {
    if (checklist) {
      setCheckedValues(checklist);
      setCompletedPercent(calCompletedTask());
    }
  }, [checklist]);

  const calCompletedTask = useCallback(() => {
    let resutlt = checklist.reduce(
      (acc, cur) => {
        if (cur.status === true) acc.finished++;
        acc.total++;
        acc.percentage = (acc.finished / acc.total) * 100;
        return acc;
      },
      { finished: 0, total: 0, percentage: 0 },
    );
    return resutlt;
  }, [checklist]);

  const handleChange = useCallback(
    item => {
      setCheckedValues(checkedValues.map(el => (el.value === item.value ? { ...el, status: !el.status } : el)));
    },
    [checkedValues],
  );

  const handleUpdateCheckList = () => {
    dispatch(cardActions.asyncEditCheckListTodoCard(cardId, checkedValues));
  };

  const handleRemoveCheckList = checklistId => {
    dispatch(cardActions.asyncRemoveCheckListTodoCard(cardId, checklistId));
  };

  return (
    <>
      <LinearWithValueLabel completedTodo={completedPercent.percentage} />
      {checkedValues?.map(option => (
        <CheckBox
          key={option.value}
          name="checklist-group"
          option={option}
          onChange={() => handleChange(option)}
          selected={option.status}
          handleRemoveCheckList={handleRemoveCheckList}
        />
      ))}
      <Button
        disableRipple
        variant="contained"
        color="primary"
        className={classes.btnMarginTop}
        onClick={handleUpdateCheckList}
      >
        {translate('update')}
      </Button>
    </>
  );
}

CheckListSelect.propTypes = {
  checklist: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default memo(CheckListSelect);
