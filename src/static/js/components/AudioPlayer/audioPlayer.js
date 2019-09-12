import React from 'react';
import PropTypes from 'prop-types';

function AudioPlayer(props) {
  return (
    <div className="b-audio-player">
      <audio ref={props.refAudio} src={props.file} preload="auto" controls></audio>
      <button className="b-audio-player__play" onClick={props.handleAudioPlay} data-play={props.play} />
      <div className="b-audio-player__range">
        <input ref={props.refAudioTrack} type="range" min="0" max="100" step="0.01"
                defaultValue={props.currentTimeSec} onChange={props.handleRange} />
        <div className="b-audio-player__track">
          <div style={{ width: `${props.progress}%` }}/>
        </div>
      </div>
      <div className="b-audio-player__duration">
        {props.currentTime} / {props.duration}
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  refAudio: PropTypes.object,
  refAudioTrack: PropTypes.object,
  handleAudioPlay: PropTypes.object,
  handleRange: PropTypes.object,
  play: PropTypes.bool,
  currentTimeSec: PropTypes.string,
  progress: PropTypes.string,
  currentTime: PropTypes.string,
  duration: PropTypes.string,
  file: PropTypes.string,
};

export default AudioPlayer;
