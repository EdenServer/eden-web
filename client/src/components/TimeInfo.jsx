import React, { useState, useEffect } from 'react';
import InfoDisplay from './InfoDisplay';
import Ballista from './Ballista';

const weekDays = [
  { name: 'Firesday', color: '#DD0000' },
  { name: 'Earthsday', color: '#AAAA00' },
  { name: 'Watersday', color: '#0000DD' },
  { name: 'Windsday', color: '#00AA22' },
  { name: 'Iceday', color: '#7799FF' },
  { name: 'Lightningday', color: '#AA00AA' },
  { name: 'Lightsday', color: '#AAAAAA' },
  { name: 'Darksday', color: '#222222' },
];

function vanaTimeToDate(vanaTime) {
  return {
    year: Math.floor(vanaTime / 518400 + 886),
    month: (Math.floor(vanaTime / 43200) % 12) + 1,
    day: (Math.floor(vanaTime / 1440) % 30) + 1,
    weekDay: Math.floor((vanaTime % 11520) / 1440),
    hour: Math.floor((vanaTime % 1440) / 60),
    minute: Math.floor(vanaTime % 60),
  };
}

function timestampToVanaDate(epochMs) {
  return vanaTimeToDate(Math.floor(((epochMs - 1009810800000) * 25) / 60 / 1000));
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

  return (
    <>
      <InfoDisplay title={'Vanadiel time information'}>
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <b>Vana'diel time:</b>
                <br />
                <span
                  style={{
                    color: weekDays[vanaWeekDay]?.color,
                    fontWeight: 'bold',
                  }}
                >
                  {weekDays[vanaWeekDay]?.name}
                </span>
                {` – ${vanaYear}-${padZeros(vanaMonth, 2)}-${padZeros(vanaDay, 2)}`}
                {` ${padZeros(vanaHour, 2)}:${padZeros(vanaMinute, 2)}`}
              </td>
              <td>
                <b>Earth time</b>
                <br />
                {new Date(now).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </InfoDisplay>
      <Ballista vanaDay={vanaDay} vanaDate={vanaDate} />
    </>
  );
};

export default TimeInfo;
