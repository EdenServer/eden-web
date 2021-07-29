import React, { useState, useEffect } from 'react';
import InfoDisplay from './InfoDisplay';
import { useMediaQuery } from 'react-responsive';

import SandoriaLogo from '../assets/sandoria.jpg';
import BastokLogo from '../assets/bastok.jpg';
import WindurstLogo from '../assets/windurst.jpg';

const nations = {
  sandoria: {
    name: "San d'Oria",
    logoSrc: SandoriaLogo,
  },
  bastok: {
    name: 'Bastok',
    logoSrc: BastokLogo,
  },
  windurst: {
    name: 'Windurst',
    logoSrc: WindurstLogo,
  },
};

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

function vanaDateToVanaTime(year, month, day, hour = 0, minute = 0) {
  return (year - 886) * 518400 + (month - 1) * 43200 + (day - 1) * 1440 + hour * 60 + minute;
}

function vanaDateToTimestamp(year, month, day, hour = 0, minute = 0) {
  return 1000 * ((vanaDateToVanaTime(year, month, day, hour, minute) * 60) / 25 + 1009810800);
}

function vanaDateToBallistaMatch(year, month, day) {
  const match = {};

  switch ((day - 1) % 6) {
    case 1:
      match.zone = 'Jugner Forest';
      if (month <= 4) {
        match.team1 = nations.sandoria;
        match.team2 = nations.bastok;
      } else if (month <= 8) {
        match.team1 = nations.bastok;
        match.team2 = nations.windurst;
      } else {
        match.team1 = nations.sandoria;
        match.team2 = nations.windurst;
      }
      break;

    case 3:
      match.zone = 'Pashhow Marshlands';
      if (month <= 4) {
        match.team1 = nations.bastok;
        match.team2 = nations.windurst;
      } else if (month <= 8) {
        match.team1 = nations.sandoria;
        match.team2 = nations.windurst;
      } else {
        match.team1 = nations.sandoria;
        match.team2 = nations.bastok;
      }
      break;

    case 5:
      match.zone = 'Meriphataud Mountains';
      if (month <= 4) {
        match.team1 = nations.sandoria;
        match.team2 = nations.windurst;
      } else if (month <= 8) {
        match.team1 = nations.sandoria;
        match.team2 = nations.bastok;
      } else {
        match.team1 = nations.bastok;
        match.team2 = nations.windurst;
      }
      break;

    default:
      return null;
  }

  match.levelCap = 0;
  if (day < 26) {
    match.levelCap = Math.floor((day - 1) / 6) * 10 + 30;
  }

  match.entryStart = vanaDateToTimestamp(year, month, day - 1, 12);
  match.entryEnd = vanaDateToTimestamp(year, month, day - 1, 22);
  match.start = vanaDateToTimestamp(year, month, day);
  match.end = vanaDateToTimestamp(year, month, day + 1, 0);

  return match;
}

function useInput({ type, value = '', max = 100, style }) {
  const [inputValue, setValue] = useState(value);
  const input = <input value={inputValue} style={style} width="5" onChange={e => setValue(Math.max(0, Math.min(e.target.value, max)))} type={type} />;
  return [inputValue, input];
}

function formatTime(timestamp) {
  return <span>{new Date(timestamp).toLocaleTimeString()}</span>;
}

function formatTabs(items) {
  return (
    <table className="tab-table" style={{ display: 'inline-block', textAlign: 'right' }}>
      <tbody>
        {items.map(subItems => (
          <tr>
            {subItems.map(item => (
              <td>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const Ballista = React.memo(
  ({ vanaDay, vanaDate }) => {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [matchCount, matchCountInput] = useInput({
      type: 'text',
      value: '5',
      style: { border: '1px solid grey', width: '2.2em', textAlign: 'center' },
    });

    useEffect(() => {
      const matches = [];
      const currentDate = { ...vanaDate };

      // Go to next even day (when Ballista happens)
      incrementVanaDate(currentDate, currentDate.day % 2);

      let toShow = parseInt(matchCount);

      for (let i = 0; i < toShow; i++) {
        const match = vanaDateToBallistaMatch(currentDate.year, currentDate.month, currentDate.day);
        if (match !== null) {
          matches.push(match);
        }

        incrementVanaDate(currentDate, 2);
      }
      setUpcomingMatches(matches);
    }, [vanaDay, matchCount]);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const upcomingMatchesRows = [];
    let currentDay = new Date().getDate();
    for (let i = 0; i < upcomingMatches.length; i++) {
      const match = upcomingMatches[i];
      const matchDate = new Date(match.entryStart);

      if (matchDate.getDate() != currentDay) {
        upcomingMatchesRows.push(
          <tr>
            <td colSpan="100%" style={{ padding: '0.5em 0' }}>
              <b>{matchDate.toLocaleDateString()}</b>
            </td>
          </tr>
        );
        currentDay = matchDate.getDate();
      }

      upcomingMatchesRows.push(
        <tr key={match.startTime}>
          <td>{match.zone}</td>
          <td>{match.levelCap == 0 ? 'None' : match.levelCap}</td>
          <td>
            <img src={match.team1.logoSrc} alt={match.team1.name} width={isTabletOrMobile ? '20px' : '32px'} />
            {isTabletOrMobile ? ' ' : ' vs '}
            <img src={match.team2.logoSrc} alt={match.team2.name} width={isTabletOrMobile ? '20px' : '32px'} />
          </td>
          <td>
            {formatTabs([
              [<b>Entry:</b>, formatTime(match.entryStart), ' → ', formatTime(match.entryEnd)],
              [<b>Match:</b>, formatTime(match.start), ' → ', formatTime(match.end)],
            ])}
          </td>
        </tr>
      );
    }

    return (
      <InfoDisplay title={'Upcoming Ballista matches'}>
        <table width="100%" style={{ textAlign: 'center', margin: '0.5em 0', padding: '0.5em' }} border="true">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Level cap</th>
              <th>Nations</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{upcomingMatchesRows}</tbody>
        </table>
        <div style={{ textAlign: 'right' }}>Show: {matchCountInput}</div>
      </InfoDisplay>
    );
  },
  (props, newProps) => props.vanaDay == newProps.vanaDay
);

export default Ballista;
