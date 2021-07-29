import React, { memo, useCallback, useEffect, useState } from 'react';
import { completedTodoApis } from 'apis';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'selectors/auth.selector';
import TodoReport from 'features/Todos/TodoReport';

function ReportPage() {
  const dispatch = useDispatch();
  const curUser = useSelector(getCurrentUser);
  const boardId = curUser.boardId[0];
  const [reports, setReports] = useState({});
  const [team, setTeam] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const result = await completedTodoApis.getReportByBoardId(boardId);
        const teamTodo = await completedTodoApis.getMemberTeamTodo(boardId);

        if (result.status === 200) {
          setReports({ ...result.data.completedTodo });
          setTeam([...teamTodo.data.teamwork?.member]);
          setTotalCards(result.data.totalCards);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
