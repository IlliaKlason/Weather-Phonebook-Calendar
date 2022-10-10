import React from 'react';

import Appear from 'components/Appear';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import CalendarDaysForm from './CalendarDaysForm';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';

import { nanoid } from 'nanoid';

import './DateCalendar.scss';
import Loader from 'components/common/Loader';

class DateCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.day,
      month: this.props.month - 1,
      year: this.props.year,
      cursor: '',
      event: '',
      events: null,
      toggleForm: false,
      loading: false,
    };

    this.setDay = this.setDay.bind(this);
    this.setDate = this.setDate.bind(this);
    this.resetDate = this.resetDate.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
  }

  componentDidMount() {
    // this.setState({ loading: false });
    this.setDate(this.props.day, this.props.month - 1, this.state.year);
  }

  formatDate(day, month, year) {
    day = day.toString().length < 2 ? '0' + day : day;
    month += 1;
    month = month.toString().length < 2 ? '0' + month : month;
    return `${day}.${month}.${year}`;
  }

  setDate(day, month, year, e) {
    if (e) e.preventDefault();
    let date = this.formatDate(day, month, year);
    this.setState({ cursor: date });
  }
  setDay(day, e) {
    this.setDate(day, this.state.month, this.state.year, e);
  }

  resetDate(e) {
    e.preventDefault();
    this.setState({
      year: this.props.year,
      month: this.props.month - 1,
      day: this.props.day,
    });
    this.setDate(this.props.day, this.props.month - 1, this.props.year);
  }
  prevMonth(e) {
    e.preventDefault();
    let m = this.state.month - 1 === -1 ? 11 : this.state.month - 1;
    let y = m === 11 ? this.state.year - 1 : this.state.year;
    this.setState({ year: y, month: m });
  }
  nextMonth(e) {
    e.preventDefault();
    let m = this.state.month + 1 === 12 ? 0 : this.state.month + 1;
    let y = m === 0 ? this.state.year + 1 : this.state.year;
    this.setState({ year: y, month: m });
  }

  prevYear() {
    this.setState(prevState => {
      return {
        year: prevState.year - 1,
      };
    });
  }

  nextYear() {
    this.setState(prevState => {
      return {
        year: prevState.year + 1,
      };
    });
  }

  render() {
    let date = new Date(this.state.year, this.state.month, 1);

    let weekDay = date.getDay() !== 0 ? date.getDay() : 7;

    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    date.setDate(date.getDate() - 1);
    let lastDay = date.getDate();

    let calendar = [];
    let start = weekDay - 1,
      end = weekDay + lastDay - 1;
    for (let i = 0; i < 42; ++i) {
      if (i >= start && i < end) {
        calendar[i] = i - weekDay + 2;
      } else {
        calendar[i] = '';
      }
    }

    let cursorDate = this.state.cursor.split('.');

    let days = calendar.map((item, i) => {
      if (item) {
        let thisMonth =
          this.state.month == cursorDate[1] - 1 &&
          this.state.year == cursorDate[2];

        let selected = item == cursorDate[0] && thisMonth;

        return (
          <CalendarDay
            key={nanoid()}
            days={item}
            selected={selected}
            setDay={this.setDay}
            data={this.state.cursor}
          />
        );
      } else {
        return <CalendarDay key={nanoid()} day={-1} data={this.state.cursor} />;
      }
    });

    return (
      <>
        {/* {this.state.loading && <Loader />} */}

        <CalendarHeader />

        <div className="section-container">
          <Appear time={500}>
            <div
              className="calendar calendar-container"
              style={{
                maxWidth: '350px',
                minWidth: '350px',
              }}
            >
              <CalendarDaysForm
                prevYear={this.prevYear}
                prevMonth={this.prevMonth}
                activeMonth={this.state.month}
                getYear={this.state.year}
                nextMonth={this.nextMonth}
                nextYear={this.nextYear}
                days={days}
                resetDate={this.resetDate}
              />
            </div>
          </Appear>
          <Appear time={500}>
            <div className="container-event-add">
              <div className="event-add">
                <CalendarForm data={this.state.cursor} />

                <CalendarList data={this.state.cursor} />
              </div>
            </div>
          </Appear>
        </div>
      </>
    );
  }
}

export default DateCalendar;
