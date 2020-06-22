import React from 'react';

interface YellTextProps {
  date: Date;
  speaker: string;
  message: string;
}

const translatePattern = /«([^»]+?)»/g;

function parseYell(message: string) {
  let currentIdx = 0;
  let result = [];
  for (const match of message.matchAll(translatePattern)) {
    let translatedText = match[1];
    result.push(message.slice(currentIdx, match.index));

    result.push(<span className="gm_autotranslate-start">{'{'}</span>);
    result.push(translatedText);
    result.push(<span className="gm_autotranslate-end">{'}'}</span>);

    currentIdx = match.index! + translatedText.length + 2;
  }

  if (currentIdx < message.length) {
    result.push(message.slice(currentIdx));
  }
  return result;
}

const YellText = (yell: YellTextProps) => (
  <>
    <span className="gm_yell-name">
      [{new Date(yell.date).toLocaleTimeString()}] {yell.speaker}
    </span>{' '}
    : &nbsp;
    <span className="gm_yell-text">{parseYell(yell.message)}</span>
  </>
);

export default YellText;
