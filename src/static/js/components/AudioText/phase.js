import React from 'react';
import PropTypes from 'prop-types';

function Phrase(props) {
  return (
    <li className="b-audio-text__li">
      <div className="b-audio-text__photo"></div>
      <div className="b-audio-text__time">{props.timeStart}</div>
      <div className="b-audio-text__phrase">
        {props.phrase}
      </div>
    </li>
  );
}

Phrase.propTypes = {
  timeStart: PropTypes.string,
  phrase: PropTypes.string,
};

export default Phrase;
