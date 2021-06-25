import React, { memo, useCallback, useEffect, useState } from "react";
import { completedTodoApis } from "apis";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import TodoReport from "features/Todos/TodoReport";

function ReportPage() {
  const dispatch = useDispatch();
  const curUser = useSelector(getCurrentUser);
  const boardId = curUser.boardId[0];
  const [reports, setReports] = useState({});
  const [team, setTeam] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        //dispatch(actShowLoading());
        setLoading(true);
        const result = await completedTodoApis.getReportByBoardId(boardId);
        const teamTodo = await completedTodoApis.getMemberTeamTodo(boardId);
        const reportTodos = await completedTodoApis.getAllReport();
        if (result.status === 200) {
          setReports({ ...result.data.completedTodo });
          setAllReports([...reportTodos.data.reports]);
          setTeam([...teamTodo.data.completedList]);
          setTotalCards(result.data.totalCards);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [boardId, dispatch]);

  const handleChangeBoard = useCallback(async id => {
    try {
      const response = await completedTodoApis.getReportById(id);
      if (response.status === 200) {
        setReports({ ...response.data.report[0] });
        setTotalCards(response.data.totalCards);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <React.Fragment>
      <TodoReport
        allReports={allReports}
        reports={reports}
        totalCards={totalCards}
        handleChangeBoard={handleChangeBoard}
        team={team}
        loading={loading}
      />
    </React.Fragment>
  );
}

export default memo(ReportPage);
