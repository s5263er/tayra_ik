// HR_Home.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Layout from './Layout';

moment.locale('tr');

const localizer = momentLocalizer(moment);

const messages = {
  today: 'Bugün',
  previous: 'Geri',
  next: 'İleri',
  month: 'Ay',
  week: 'Hafta',
  day: 'Gün',
  agenda: 'Ajanda',
};

function HR_Home() {
  const handleNavigate = (date, view) => {
    console.log('Navigated to:', date, 'in view:', view);
  };

  return (
    <Layout>
      <h1>Takvim</h1>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={[
            {
              title: 'Event 1',
              start: new Date(2023, 0, 1, 10),
              end: new Date(2023, 0, 1, 11),
            },
          ]}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="week"
          messages={messages}
          onNavigate={handleNavigate}
          min={new Date(2023, 0, 1, 8)}
          max={new Date(2023, 0, 1, 21)}
          dayStart={new Date(0, 0, 0, 8)}
          dayEnd={new Date(0, 0, 0, 21)}
        />
      </div>
    </Layout>
  );
}

export default HR_Home;
