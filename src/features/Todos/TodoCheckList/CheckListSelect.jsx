import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "../../../components/FormControls";
import { todosActions } from "../../../actions/Todos";
import PropTypes from "prop-types";

function CheckListSelect({ checklist, cardId }) {
  const dispatch = useDispatch();
  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    if (checklist) {
      setCheckedValues(checklist);
    }
  }, [checklist]);

  const handleChange = useCallback(
    item => {
      setCheckedValues(
        checkedValues.map(el =>
          el.value === item.value ? { ...el, status: !el.status } : el
        )
      );
    },
    [checkedValues]
  );

  const handleUpdateCheckList = () => {
    dispatch(todosActions.asyncEditCheckListTodoCard(cardId, checkedValues));
  };

  return (
    <>
      {checkedValues?.map(option => (
        // test logic lại chỗ này
        <Checkbox
          key={option.value}
          name="checklist-group"
          option={option}
          onChange={() => handleChange(option)}
          selected={option.status}
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

export default CheckListSelect;
