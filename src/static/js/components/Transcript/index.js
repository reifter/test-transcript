/* global fetch:false */
import React from 'react';

import AudioPlayer from '../AudioPlayer';
import AudioText from '../AudioText';

import './index.scss';

const STORE = {
  transcriptJson: [],
  fileTranscript: 'static/files/transcript.json',
  fileAudio: 'static/files/audio.wav',
  fileName: 'Пример звонка.wav',
  fileTime: '21 мар 21:45:02',
};

class Transcript extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
    };
  }

  componentDidMount() {
    this.loadTranscript();
  }

  loadTranscript() {
    fetch(STORE.fileTranscript)
      .then((response) => {
        const res = response.json();
        return res;
      })
      .then((data) => {
        STORE.transcriptJson = data;
        this.forceUpdate();
      })
      .catch();
  }

  handleTimeUpdate = (currentTime) => {
    this.setState({
      currentTime,
    });
  }

  render() {
    return (
      <div className="b-audio">
        <div className="b-audio__transcript">
          <div className="b-transcript">
            <div className="b-transcript__header">
              <div className="b-transcript__title">{STORE.fileName}</div>
              <div className="b-transcript__date">{STORE.fileTime}</div>
            </div>
            <div className="b-transcript__content">
              <AudioText transcript={STORE.transcriptJson} currentTime={this.state.currentTime} />
            </div>
          </div>
        </div>
        <div className="b-audio__player">
          <AudioPlayer file={STORE.fileAudio} handleTimeUpdate={this.handleTimeUpdate} />
        </div>
      </div>
    );
  }
}

export default Transcript;
