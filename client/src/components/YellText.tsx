import React from 'react';

interface YellTextProps {
  date: Date;
  speaker: string;
  message: string;
}

const translatePattern = /«([^»]+?)»/g;

function parseYell(message: string) {
  let currentIdx = 0;
  const result = [];
  for (const match of message.matchAll(translatePattern)) {
    const translatedText = match[1];
    result.push(message.slice(currentIdx, match.index));

    result.push(
      <span className="gm_autotranslate-start" key={`translate-start-${match.index}`}>
        {'{'}
      </span>
    );
    result.push(translatedText);
    result.push(
      <span className="gm_autotranslate-end" key={`translate-end-${match.index}`}>
        {'}'}
      </span>
    );

    currentIdx = match.index! + translatedText.length + 2;
  }

  if (currentIdx < message.length) {
    result.push(message.slice(currentIdx));
  }
  return result;
}

const YellText = ({ date, speaker, message }: YellTextProps) => (
  <>
    <span className="gm_yell-name" key="name">
      [{new Date(date).toLocaleTimeString()}] {speaker}
    </span>{' '}
    : &nbsp;
    <span className="gm_yell-text" key="text">
      {parseYell(message)}
    </span>
  </>
);

export default YellText;
