import React, { useCallback, useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "components/FormControls";
import ProgressBar from "components/ProgressBar";
import { todosActions } from "actions/Todos";
import { round } from "helpers";
import PropTypes from "prop-types";

function CheckListSelect({ checklist, cardId }) {
  const dispatch = useDispatch();
  const [checkedValues, setCheckedValues] = useState([]);
  const [completedPercent, setCompletedPercent] = useState(0);

  useEffect(() => {
    if (checklist) {
      setCheckedValues(checklist);
    }
  }, [checklist]);

  const calCompletedTask = useCallback(() => {
    const result = round(100 / checkedValues.length);
    setCompletedPercent(preState => preState + result);
  }, [checkedValues]);

  const handleChange = useCallback(
    item => {
      setCheckedValues(checkedValues.map(el => (el.value === item.value ? { ...el, status: !el.status } : el)));
      calCompletedTask();
    },
    [checkedValues]
  );

  const handleUpdateCheckList = () => {
    dispatch(todosActions.asyncEditCheckListTodoCard(cardId, checkedValues));
  };

  const handleRemoveCheckList = checklistId => {
    dispatch(todosActions.asyncRemoveCheckListTodoCard(cardId, checklistId));
  };

  return (
    <>
      <ProgressBar completed={completedPercent} />
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
