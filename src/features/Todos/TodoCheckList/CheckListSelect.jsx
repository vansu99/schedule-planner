import { cardActions } from "actions/Todos/card.action";
import { Checkbox } from "components/FormControls";
import LinearWithValueLabel from "components/ProgressBar";
import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function CheckListSelect({ checklist, cardId }) {
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
      { finished: 0, total: 0, percentage: 0 }
    );
    return resutlt;
  }, [checklist]);

  const handleChange = useCallback(
    item => {
      setCheckedValues(checkedValues.map(el => (el.value === item.value ? { ...el, status: !el.status } : el)));
    },
    [checkedValues]
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
        <Checkbox
          key={option.value}
          name="checklist-group"
          option={option}
          onChange={() => handleChange(option)}
          selected={option.status}
          handleRemoveCheckList={handleRemoveCheckList}
        />
      ))}
      <button className="button button-success" onClick={handleUpdateCheckList}>
        Lưu
      </button>
    </>
  );
}

CheckListSelect.propTypes = {
  checklist: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired
};

export default memo(CheckListSelect);
