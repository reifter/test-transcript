import React from 'react';
import PropTypes from 'prop-types';

import Phrase from './phase';
import secToTime from '../../lib/secToTime';

import './index.scss';

function AudioText(props) {
  let activePhrase = -1;
  let activeWord = -1;

  activePhrase = props.transcript.findIndex((item) => {
    const result = props.currentTime >= item.timeStart
                   && props.currentTime <= item.words[item.words.length - 1].timeEnd;
    return result;
  });

  if (activePhrase !== -1) {
    activeWord = props.transcript[activePhrase].words.findIndex((word) => {
      const result = props.currentTime >= word.timeStart && props.currentTime < word.timeEnd;
      return result;
    });
  }

  const textContent = props.transcript.map((item, index) => <Phrase
    key={index}
    phrase={index === activePhrase ? item.words.map((word, index2) => (
      <span key={index2}>
        <span className={index2 === activeWord ? 'active' : null}>{word.word}</span> </span>
    )) : item.phrase}
    timeStart={secToTime(item.timeStart)} />);

  return (
    <ul className="b-audio-text">
      {textContent}
    </ul>
  );
}

AudioText.propTypes = {
  transcript: PropTypes.array,
  currentTime: PropTypes.string,
};

export default AudioText;
