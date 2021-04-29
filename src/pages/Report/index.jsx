import React, { memo, useCallback, useEffect, useState } from "react";
import { actHideLoading, actShowLoading } from "actions/Global";
import { completedTodoApis } from "apis";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import TodoReport from "features/Todos/TodoReport";

function ReportPage() {
  const dispatch = useDispatch();
  const curUser = useSelector(getCurrentUser);
  const boardId = curUser.boardId[0];
  const [reports, setReports] = useState({});
  const [allReports, setAllReports] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        dispatch(actShowLoading());
        const result = await completedTodoApis.getReportByBoardId(boardId);
        const reportTodos = await completedTodoApis.getAllReport();
        if (result.status === 200) {
          dispatch(actHideLoading());
          setReports({ ...result.data.completedTodo });
          setAllReports([...reportTodos.data.reports]);
          setTotalCards(result.data.totalCards);
        }
      } catch (error) {
        dispatch(actHideLoading());
      }
    })();
  }, [boardId, dispatch]);

  const handleChangeBoard = useCallback(
    async id => {
      try {
        dispatch(actShowLoading());
        const response = await completedTodoApis.getReportById(id);
        if (response.status === 200) {
          setReports({ ...response.data.report[0] });
          setTotalCards(response.data.totalCards);
          dispatch(actHideLoading());
        }
      } catch (error) {
        dispatch(actHideLoading());
      }
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <TodoReport
        allReports={allReports}
        reports={reports}
        totalCards={totalCards}
        handleChangeBoard={handleChangeBoard}
      />
    </React.Fragment>
  );
}

export default memo(ReportPage);
