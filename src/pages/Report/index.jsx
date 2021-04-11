import React, { memo, useEffect, useState } from "react";
import { actHideLoading, actShowLoading } from "actions/Global";
import { completedTodoApis } from "apis";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import TodoReport from "features/Todos/TodoReport";

function ReportPage() {
  const dispatch = useDispatch();
  const curUser = useSelector(getCurrentUser);
  const boardId = curUser.boardId[0];
  const [reports, setReports] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    (async function () {
      dispatch(actShowLoading());
      const result = await completedTodoApis.getReportById(boardId);
      if (result.status === 200) {
        setReports([...result.data.completedTodo]);
        setTotalCards(result.data.totalCards);
        dispatch(actHideLoading());
      }
    })();
  }, [dispatch]);

  return (
    <React.Fragment>
      <TodoReport reports={reports[0]} totalCards={totalCards} />
    </React.Fragment>
  );
}

export default memo(ReportPage);
