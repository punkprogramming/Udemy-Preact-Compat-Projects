import React from "react";
import Sound from "react-sound";
import {connect} from "react-redux";

import {jamSong} from "../data/song-data";

import "../styles/song-detail.css";

class SongDetail extends React.Component {
    routeName = this.props.match.params.name;
    state = {
        shouldPlay: false,
        songDetails: {}
    }
    handlePlay = () => {
        this.setState({shouldPlay: !this.state.shouldPlay});
    }
    componentDidMount() {
        document.title = this.routeName;
        window.scrollTo(0, 0);
        if(this.props.songs) {
            for(let i=0; i<this.props.songs.length; i++) {
                if(this.props.songs[i].name === this.routeName) {
                    this.setState({songDetails: this.props.songs[i]});
                    break;
                }
            }
        }
    }
    render() {
        return (
            <div className="container song-detail-container">
                <h1 className="song-detail-title">{this.routeName}</h1>
                <button
                    className="play-btn"
                    onClick={this.handlePlay}
                >
                    {this.state.shouldPlay ? "Stop" : "Play"}
                </button>
                {this.state.songDetails &&
                    <div className="song-body-box">
                        <Sound 
                            autoload
                            url={this.state.songDetails.url || jamSong}
                            playStatus={this.state.shouldPlay ? Sound.status.PLAYING : Sound.status.STOPPED}
                            onFinishedPlaying={this.handlePlay}
                        />
                        <div className="lyrics-box">
                            <pre className="song-lyrics">{this.state.songDetails.lyrics}</pre>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs
    }
}

export default connect(mapStateToProps)(SongDetail);