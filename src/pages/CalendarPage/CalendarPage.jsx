import DateCalendar from 'components/DateCalendar/DateCalendar';

let now = new Date();

const CalendarPage = () => {
  return (
    <div>
      <DateCalendar
        year={now.getFullYear()}
        month={now.getMonth() + 1}
        day={now.getDate()}
      />
    </div>
  );
};

export default CalendarPage;
