import React, { useCallback, useState } from "react";
import { Checkbox } from "../../../components/FormControls";
import PropTypes from "prop-types";

function CheckListSelect({ checklist }) {
  const [checkedValues, setCheckedValues] = useState({});

  const handleChange = useCallback(e => {
    const selectedValue = e.target.value;

    setCheckedValues(previousState => ({
      ...previousState,
      [selectedValue]: !previousState[selectedValue]
    }));
  }, []);

  return (
    <>
      {checklist?.map(option => (
        <Checkbox
          key={option.value}
          name="checklist-group"
          option={option}
          onChange={handleChange}
          selected={!!checkedValues[option.value]}
        />
      ))}
    </>
  );
}

CheckListSelect.propTypes = {
  checklist: PropTypes.array.isRequired
};

export default CheckListSelect;
