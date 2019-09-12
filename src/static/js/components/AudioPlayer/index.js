import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayerView from './audioPlayer';
import secToTime from '../../lib/secToTime';

import './index.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      play: false,
      progress: 0,
      duration: 0,
    };

    this.handleAudio = (el) => {
      this.audio = el;
    };
    this.handleAudioTrack = (el) => {
      this.audioTrack = el;
    };
  }

  componentDidMount() {
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetaData);
    this.audio.addEventListener('ended', this.handleAudioEnd);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.removeEventListener('loadedmetadata', this.handleLoadedMetaData);
    this.audio.removeEventListener('ended', this.handleAudioEnd);
  }

  handleLoadedMetaData = (e) => {
    this.setState({
      duration: e.target.duration,
    });
  }

  handleAudioEnd = () => {
    this.setState({
      play: false,
    });
  }

  handleTimeUpdate = () => {
    const { currentTime, duration } = this.audio;
    this.audioTrack.value = currentTime * 100 / duration;

    this.props.handleTimeUpdate(currentTime);

    this.setState({
      progress: this.audioTrack.value,
      currentTime,
    });
  }

  handleAudioPlay = () => {
    if (this.state.play) {
      this.setState({
        play: false,
      });
      this.audio.pause();
    } else {
      this.setState({
        play: true,
      });
      this.audio.play();
    }
  }

  handleRange = (e) => {
    this.audio.currentTime = e.currentTarget.value * this.audio.duration / 100;
  }

  render() {
    return <AudioPlayerView
              refAudio={this.handleAudio}
              refAudioTrack={this.handleAudioTrack}
              handleAudioPlay={this.handleAudioPlay}
              handleRange={this.handleRange}
              play={this.state.play}
              currentTimeSec={this.state.currentTime}
              progress={this.state.progress}
              currentTime={secToTime(this.state.currentTime)}
              duration={secToTime(this.state.duration)}
              file={this.props.file}
            />;
  }
}

AudioPlayer.propTypes = {
  handleTimeUpdate: PropTypes.func,
  file: PropTypes.string,
};

export default AudioPlayer;
