import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/vi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardsApis } from "apis";
import { actHideLoading, actShowLoading } from "actions/Global";
import { calendarActions } from "actions/Calendar/calendar.action";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEdit from "./CalendarEdit";
import CustomToolbar from "./components/CustomToolbar";

moment.locale("vi");
const localizer = momentLocalizer(moment);

function CalendarCpt(props) {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [dataEvent, setDataEvent] = useState({
    id: "",
    title: "",
    date: new Date()
  });

  useEffect(() => {
    (async function () {
      try {
        dispatch(actShowLoading());
        const result = await boardsApis.getCardsFromBoard(boardId);
        if (result.status === 200) {
          setEvents([...result.data.cards]);
          dispatch(actHideLoading());
        }
      } catch (error) {
        dispatch(actHideLoading());
      }
    })();
  }, [dispatch, boardId]);

  const openEditEventTodo = event => {
    setDataEvent({
      id: event?._id,
      title: event?.title,
      date: new Date(event?.date)
    });
    dispatch(calendarActions.openEditEvent());
  };

  return (
    <React.Fragment>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="date"
        titleAccessor="title"
        views={["month"]}
        endAccessor={event => moment(event.date).add(1, "hour").toDate()}
        popup
        selectable
        style={{ height: "85vh" }}
        onSelectEvent={event => openEditEventTodo(event)}
        components={{
          toolbar: CustomToolbar
        }}
      />
      {dataEvent && <CalendarEdit event={dataEvent} />}
    </React.Fragment>
  );
}

CalendarCpt.propTypes = {};

export default CalendarCpt;
