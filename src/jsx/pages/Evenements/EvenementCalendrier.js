import React, { useEffect, useState, useRef, memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Alert from "sweetalert2";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const ExternalEvent = memo(({ event }) => {
  let elRef = useRef(null);

  useEffect(() => {
    let draggable = new Draggable(elRef.current, {
      eventData: function () {
        return { ...event, create: true };
      }
    });

    // a cleanup function
    return () => draggable.destroy();
  },[]);

  return (
    <div
      ref={elRef}
      className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
      title={event.title}
      style={{
        backgroundColor: event.color,
        borderColor: event.color,
        cursor: "pointer"
      }}
    >
      <div className="fc-event-main">
        <div>
          <strong>{event.title}</strong>
        </div>
      </div>
    </div>
  );
});

const EvenementCalendrier=()=>{
  // initial state
  const [state, setState] = useState({
    weekendsVisible: true,
    externalEvents: [
      { title: "Art 1", color: "#0097a7", id: 34432 },
      { title: "Art 2", color: "#f44336", id: 323232 },
      { title: "Art 3", color: "#f57f17", id: 1111 },
      { title: "Art 4", color: "#90a4ae", id: 432432 }
    ],
    calendarEvents: [
      {
        id: 1,
        title: "All-day event",
        color: "#388e3c",
        start: "2020-12-12",
        end: "2020-12-12"
      },
      {
        id: 2,
        title: "Timed event",
        color: "#0097a7",
        start: "2020-12-07",
        end: "2020-12-10"
      }
    ]
  });

  // add external events
  const addEvent = () => {
    let newEvent = {
      id: 3433,
      title: "Timed event",
      color: "#333333",
      start: "2020-12-31",
      end: "2020-12-31",
      custom: "custom stuff"
    };

    setState((state) => {
      return {
        ...state,
        externalEvents: state.externalEvents.concat(newEvent)
      };
    });
  };

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      end: eventInfo.date,
      custom: eventInfo.draggedEl.getAttribute("data-custom")
    };

    setState((state) => {
      return {
        ...state,
        calendarEvents: state.calendarEvents.concat(newEvent)
      };
    });
  };

//function eventClick
  const eventClick = (eventClick) => {
      
    Alert.fire({
       title: eventClick.event.title,
       html:
        `
         <Modal className="fade" show={basicModal}>
         <Modal.Header>
           <Modal.Title>Modal title</Modal.Title>
           <Button
             variant=""
             className="btn-close"
             onClick={() => setBasicModal(false)}
           >
             
           </Button>
         </Modal.Header>
         <Modal.Body>Modal body text goes here.</Modal.Body>
         <Modal.Footer>
           <Button
             onClick={() => setBasicModal(false)}
             variant="danger light"
           >
             Close
           </Button>
           <Button variant="primary">Save changes</Button>
         </Modal.Footer>
       </Modal>
         `,

       showCancelButton: true,
       confirmButtonColor: "#d33",
       cancelButtonColor: "#3085d6",
       confirmButtonText: "Remove Event",
       cancelButtonText: "Close",
    }).then((result) => {
       if (result.value) {
          eventClick.event.remove(); // It will remove event from the calendar
          Alert.fire("Deleted!", "Your Event has been deleted.", "success");
       }
    });
 };

  return (
    <div className="App">
      <div style={{ float: "left", width: "25%" }}>
        <div style={{ margin: "0 0 20px" }}>
          <input
            type="submit"
            name="name"
            onClick={addEvent}
            value="add external event"
          />
        </div>
        <div id="external-events">
          {state.externalEvents && state.externalEvents.map((event) => (
            <ExternalEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div style={{ float: "left", width: "75%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          events={state.calendarEvents}
          droppable={true}
          eventReceive={handleEventReceive}
          eventClick={eventClick}
        />
      </div>
    </div>
  );
}
export default EvenementCalendrier
