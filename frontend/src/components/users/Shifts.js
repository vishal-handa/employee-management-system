import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const Shifts = () => {
  const events = Object.values(useSelector((state) => state.user.user.shifts));
  const newEvents = events.map((elem) => {
    return {
      ...elem,
      startTime: new Date(parseInt(elem.startTime)),
      endTime: new Date(parseInt(elem.endTime)),
    };
  });

  // console.log(newEvents);
  return (
    <Wrapper>
      <Menu />
      <Calendar
        localizer={localizer}
        views={allViews}
        events={newEvents}
        step={60}
        showMultiDayTimes
        defaultDate={moment().toDate()}
        defaultView="month"
        startAccessor="startTime"
        endAccessor="endTime"
        style={{ height: "100vh", width: "95%", padding: "10px", zIndex: "10" }}
        eventPropGetter={(event) => {
          const eventData = events.find((ot) => ot.id === event.id);
          const backgroundColor = eventData && eventData.color;
          return { style: { backgroundColor } };
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Shifts;
