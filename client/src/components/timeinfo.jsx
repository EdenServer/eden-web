import React, { useState, useEffect } from 'react';
import InfoDisplay from './InfoDisplay';
import { Segment } from 'semantic-ui-react';

const weekDays = [
  { name: "Firesday", color: "#DD0000" },
  { name: "Earthsday", color: "#AAAA00" },
  { name: "Watersday", color: "#0000DD" },
  { name: "Windsday", color: "#00AA22" },
  { name: "Iceday", color: "#7799FF" },
  { name: "Lightningday", color: "#AA00AA" },
  { name: "Lightsday", color: "#AAAAAA" },
  { name: "Darksday", color: "#222222" },
];

function vanaTimeToDate(vanaTime) {
  return {
    year: Math.floor(vanaTime / 518400 + 886),
    month: (Math.floor(vanaTime / 43200) % 12) + 1,
    day: (Math.floor(vanaTime / 1440) % 30) + 1,
    weekDay: Math.floor(vanaTime % 11520 / 1440),
    hour: Math.floor((vanaTime % 1440) / 60),
    minute: Math.floor(vanaTime % 60),
  };
}

function incrementVanaDate(date, daysToIncrement = 1) {
  date.day += daysToIncrement;
  while (date.day > 30) {
    date.month++;
    date.day -= 30;
  }
  while (date.month > 12) {
    date.year++;
    date.month -= 12;
  }

  return date;
}

function timestampToVanaDate(epochMs) {
  return vanaTimeToDate(
    Math.floor(((epochMs - 1009810800000) * 25) / 60 / 1000)
  );
}

function vanaDateToVanaTime(year, month, day, hour = 0, minute = 0) {
  return (
    (year - 886) * 518400 +
    (month - 1) * 43200 +
    (day - 1) * 1440 +
    hour * 60 +
    minute
  );
}

function vanaDateToTimestamp(year, month, day, hour = 0, minute = 0) {
  return (
    1000 *
    ((vanaDateToVanaTime(year, month, day, hour, minute) * 60) / 25 +
      1009810800)
  );
}

function vanaDateToBallista(year, month, day) {
  const ballista = {};

  switch ((day - 1) % 6) {
    case 1:
      ballista.zone = 'Jugner Forest';
      if (month <= 4) {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Bastok';
      } else if (month <= 8) {
        ballista.team1 = 'Bastok';
        ballista.team2 = 'Windurst';
      } else {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Windurst';
      }
      break;

    case 3:
      ballista.zone = 'Pashhow Marshlands';
      if (month <= 4) {
        ballista.team1 = 'Bastok';
        ballista.team2 = 'Windurst';
      } else if (month <= 8) {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Windurst';
      } else {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Bastok';
      }
      break;

    case 5:
      ballista.zone = 'Meriphataud Mountains';
      if (month <= 4) {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Windurst';
      } else if (month <= 8) {
        ballista.team1 = "San d'Oria";
        ballista.team2 = 'Bastok';
      } else {
        ballista.team1 = 'Bastok';
        ballista.team2 = 'Windurst';
      }
      break;

    default:
      return null;
  }

  ballista.levelCap = 0;
  if (day < 26) {
    ballista.levelCap = Math.floor((day - 1) / 6) * 10 + 30;
  }

  ballista.entryTime = vanaDateToTimestamp(year, month, day - 1, 12);
  ballista.startTime = vanaDateToTimestamp(year, month, day);

  return ballista;
}

function useInput({ type, value = '', max = 100, style }) {
  const [inputValue, setValue] = useState(value);
  const input = (
    <input value={inputValue} style={style} width="5" onChange={e => setValue(Math.max(0, Math.min(e.target.value, max)))} type={type} />
  );
  return [inputValue, input];
}

function padZeros(number, length) {
  return number?.toString()?.padStart(length, 0);
}

const TimeInfo = () => {
  const [now, setNow] = useState(Date.now());
  const [vanaDate, setVanaDate] = useState(timestampToVanaDate(now));

  const [vanaYear, setVanaYear] = useState();
  const [vanaMonth, setVanaMonth] = useState();
  const [vanaDay, setVanaDay] = useState();
  const [vanaWeekDay, setVanaWeekDay] = useState();
  const [vanaHour, setVanaHour] = useState();
  const [vanaMinute, setVanaMinute] = useState();

  const [upcomingBallista, setUpcomingBallista] = useState([]);
  const [ballistaCount, ballistaCountInput] = useInput({
    type: 'text',
    value: '5',
    style: { border: '1px solid grey', width: '2.5em' },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const newNow = Date.now();
      setNow(newNow);
      setVanaDate(timestampToVanaDate(newNow));
    }, 400);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setVanaYear(vanaDate.year);
    setVanaMonth(vanaDate.month);
    setVanaDay(vanaDate.day);
    setVanaWeekDay(vanaDate.weekDay);
    setVanaHour(vanaDate.hour);
    setVanaMinute(vanaDate.minute);
  }, [vanaDate]);

  useEffect(() => {
    const ballistas = [];
    const currentDate = { ...vanaDate };

    // Go to next even day (when Ballista happens)
    incrementVanaDate(currentDate, 2 - (currentDate.day % 2));

    let toShow = parseInt(ballistaCount);

    for (let i = 0; i < toShow; i++) {
      const ballista = vanaDateToBallista(
        currentDate.year,
        currentDate.month,
        currentDate.day
      );
      if (ballista !== null) {
        ballistas.push(ballista);
      }

      incrementVanaDate(currentDate, 2);
    }
    setUpcomingBallista(ballistas);
  }, [vanaDay, ballistaCount]);

  return (
    <InfoDisplay title={'Vanadiel time information'}>

      <table width="100%">
        <tbody>
          <tr>
            <td>
              <b>Vana'diel time:</b><br/>
              <span style={{ color: weekDays[vanaWeekDay]?.color, fontWeight: "bold" }}>
                {weekDays[vanaWeekDay]?.name}
              </span>
              {` – ${vanaYear}-${padZeros(vanaMonth, 2)}-${padZeros(vanaDay, 2)} ${padZeros(vanaHour, 2)}:${padZeros(vanaMinute, 2)}`}
            </td>
            <td>
              <b>Earth time</b><br/>
              {new Date(now).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <Segment>
        <h3>Upcoming official Ballista matches</h3>
        <div>To show: {ballistaCountInput}</div>
        <table width="100%" style={{ textAlign: "center", margin: "0.5em", padding: "0.5em" }} border="true">
          <thead>
            <tr>
              <th>Entry / Start</th>
              <th>Zone</th>
              <th>Nations</th>
              <th>Level cap</th>
            </tr>
          </thead>
          <tbody>
            {upcomingBallista.map(ballista => (
                <tr key={ballista.startTime} >
                  <td>{new Date(ballista.entryTime).toLocaleString()}<br/>{new Date(ballista.startTime).toLocaleString()}</td>
                  <td>{ballista.zone}</td>
                  <td>{ballista.team1}<br/>{ballista.team2}</td>
                  <td>{ballista.levelCap == 0 ? 'None' : ballista.levelCap}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Segment>
    </InfoDisplay>
  );
};

export default TimeInfo;
