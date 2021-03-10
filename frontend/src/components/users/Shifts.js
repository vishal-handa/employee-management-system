import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import events from "./events";
const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);
const Shifts = () => {
  return (
    <Wrapper>
      <Menu />
      <Calendar
        localizer={localizer}
        views={allViews}
        events={events}
        step={60}
        showMultiDayTimes
        defaultDate={moment().toDate()}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "95%" }}
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
