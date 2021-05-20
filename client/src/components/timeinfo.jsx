import React, { useState, useEffect } from 'react';
import InfoDisplay from './InfoDisplay';
import Card from 'react-bootstrap/Card';
import { Segment, Input, List, Image } from 'semantic-ui-react';

function vanaTimeToDate(vanaTime) {
  return {
    year: Math.floor(vanaTime / 518400 + 886),
    month: (Math.floor(vanaTime / 43200) % 12) + 1,
    day: (Math.floor(vanaTime / 1440) % 30) + 1,
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

function useInput({ type, value = '' }) {
  const [inputValue, setValue] = useState(value);
  const input = (
    <input value={inputValue} onChange={e => setValue(e.target.value)} type={type} />
  );
  return [inputValue, input];
}

const TimeInfo = () => {
  const [now, setNow] = useState(Date.now());
  const [vanaDate, setVanaDate] = useState(timestampToVanaDate(now));

  const [vanaYear, setVanaYear] = useState();
  const [vanaMonth, setVanaMonth] = useState();
  const [vanaDay, setVanaDay] = useState();
  const [vanaHour, setVanaHour] = useState();
  const [vanaMinute, setVanaMinute] = useState();

  const [upcomingBallista, setUpcomingBallista] = useState([]);
  const [ballistaCount, ballistaCountInput] = useInput({ type: 'text', value: '5' });

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
    setVanaHour(vanaDate.hour);
    setVanaMinute(vanaDate.minute);
  }, [vanaDate]);

  useEffect(() => {
    const ballistas = [];
    const currentDate = { ...vanaDate };
    incrementVanaDate(currentDate, 2 - (currentDate.day % 2));

    let toShow = parseInt(ballistaCount);;

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
      <div>Real time: {new Date(now).toLocaleString()}</div>
      <div>
        Vanadiel time:{' '}
        {`${vanaYear}/${vanaMonth}/${vanaDay} ${vanaHour}:${vanaMinute}`}
      </div>
      <Segment>
        <h3>Upcoming official Ballista matches</h3>
        <div>To show: {ballistaCountInput}</div>
        {upcomingBallista.map(ballista => (
          <Segment key={ballista.startTime}>
            <table width="100%">
              <tbody>
                <tr>
                  <td>
                    <b>Zone:</b> {ballista.zone}
                  </td>
                  <td>
                    <b>Entry time:</b>{' '}
                    {new Date(ballista.entryTime).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Nations:</b> {ballista.team1} vs {ballista.team2}
                  </td>
                  <td>
                    <b>Start time:</b>{' '}
                    {new Date(ballista.startTime).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Level cap:</b> {ballista.levelCap == 0 ? 'None' : ballista.levelCap}
                  </td>
                </tr>
              </tbody>
            </table>
          </Segment>
        ))}
      </Segment>
    </InfoDisplay>
  );
};

export default TimeInfo;
