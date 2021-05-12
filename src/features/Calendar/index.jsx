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
import { Container } from "@material-ui/core";

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
      <Container>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="createdAt"
          titleAccessor="title"
          views={["month", "week"]}
          endAccessor="date"
          popup
          selectable
          style={{ height: "85vh", paddingTop: "40px" }}
          onSelectEvent={event => openEditEventTodo(event)}
          components={{
            toolbar: CustomToolbar
          }}
        />
        {dataEvent && <CalendarEdit event={dataEvent} />}
      </Container>
    </React.Fragment>
  );
}

CalendarCpt.propTypes = {};

export default CalendarCpt;
