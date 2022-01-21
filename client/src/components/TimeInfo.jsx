import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
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

const DaysInMoonCycle = 84;

function getVanaDate(vanaEpoch) {
  return {
    year: Math.floor(vanaEpoch / 518400 + 886),
    month: (Math.floor(vanaEpoch / 43200) % 12) + 1,
    day: (Math.floor(vanaEpoch / 1440) % 30) + 1,
    weekDay: Math.floor((vanaEpoch % 11520) / 1440),
    hour: Math.floor((vanaEpoch % 1440) / 60),
    minute: Math.floor(vanaEpoch % 60),
    dayOfMoon: ((Math.floor(vanaEpoch / 1440) + 38) % DaysInMoonCycle) - DaysInMoonCycle / 2,
  };
}

function timestampToVanaDate(epochMs) {
  return getVanaDate(Math.floor(((epochMs - 1009810800000) * 25) / 60 / 1000));
}

function padZeros(number, length) {
  return number?.toString()?.padStart(length, 0);
}

function getMoonPhase(vanaDate) {
  return Math.round(100 * Math.abs((vanaDate.dayOfMoon * 2) / DaysInMoonCycle));
}

function getMoonName(vanaDate) {
  if (vanaDate.dayOfMoon <= -40 || vanaDate.dayOfMoon >= 38) {
    return 'Full Moon';
  }
  if (vanaDate.dayOfMoon <= -26) {
    return 'Waning Gibbous';
  }
  if (vanaDate.dayOfMoon <= -19) {
    return 'Last Quarter Moon';
  }
  if (vanaDate.dayOfMoon <= -5) {
    return 'Waning Crescent';
  }
  if (vanaDate.dayOfMoon <= 2) {
    return 'New Moon';
  }
  if (vanaDate.dayOfMoon <= 16) {
    return 'Waxing Crescent';
  }
  if (vanaDate.dayOfMoon <= 23) {
    return 'First Quarter Moon';
  }
  if (vanaDate.dayOfMoon <= 37) {
    return 'Waxing Gibbous';
  }

  console.error('Invalid day for moon');
  return '???';
}

function calculateMoon(vanaDate) {
  return (
    <span>
      {getMoonName(vanaDate)} [{getMoonPhase(vanaDate)}% <FontAwesomeIcon icon={vanaDate.dayOfMoon >= 0 ? faAngleUp : faAngleDown} />]
    </span>
  );
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

  const [moon, setMoon] = useState();

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
    setMoon(calculateMoon(vanaDate));
  }, [vanaDay]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const date = new Date(now);
  return (
    <>
      <InfoDisplay title="Time information">
        <table width="100%" style={{ fontSize: isTabletOrMobile ? '1em' : '1.1em' }}>
          <tbody>
            <tr>
              <td>
                <strong>Vana'diel</strong>
                <br />
                <span
                  style={{
                    color: weekDays[vanaWeekDay]?.color,
                    fontWeight: 'bold',
                  }}
                >
                  {weekDays[vanaWeekDay]?.name}
                </span>
                {` – ${padZeros(vanaHour, 2)}:${padZeros(vanaMinute, 2)}`}
                {`, ${vanaYear}-${padZeros(vanaMonth, 2)}-${padZeros(vanaDay, 2)}`}
                <br />
                {moon}
              </td>

              <td>
                <strong>Earth</strong>
                <br />
                {date.toLocaleTimeString()}
                <br />
                {date.toLocaleString(undefined, { weekday: 'long' })} {date.toLocaleDateString()}
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
