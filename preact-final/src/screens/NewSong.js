import React from "react";
import {connect} from "react-redux";

import "../styles/new-song.css";
import InputField from "../components/InputField";

import {songImg1, songImg2} from "../data/song-data";
import {createNewSong} from "../actions";

class NewSong extends React.Component {
    state = {
        songName: "",
        songType: "Jam",
        songImgUrl: "",
        songLyrics: ``
    }
    handleInputChange = (event, text) => {
        if(text) {
            this.setState({[event]: text});
            return;
        }
        this.setState({[event.target.id]: event.target.value});
    }
    handleSwitchChange = () => {
        if (this.state.songType === "Jam") {
            this.setState({ songType: "Chill" });
        } else {
            this.setState({ songType: "Jam" });
        }
    }
    determineDuplicate = () => {
        for(let i=0; i<this.props.songs.length; i++) {
            if(this.props.songs[i].name === this.state.songName) {
                return true;
            }
        }
        return false;
    }
    submitNewSong = () => {
        if(this.determineDuplicate()) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            this.setState({songName: "You Already Wrote That Song..."});
            return;
        }
        const defaultSongImg = this.state.songType === "Jam" ? songImg1 : songImg2;
        
        if(!this.state.songName) {
            const newSongName = `Song Number ${this.props.songs.length + 1}`;
            if (!this.state.songImgUrl) {
                this.props.createNewSong({...this.state, songImgUrl: defaultSongImg, songName: newSongName});
            } else {
                this.props.createNewSong({...this.state, songName: newSongName});
            }
            this.props.history.push(`/songs/${newSongName}`);
            return;
        }
        else if(!this.state.songImgUrl) {
            if (!this.state.songName) {
                this.props.createNewSong({...this.state, songImgUrl: defaultSongImg, songName: newSongName});
                this.props.history.push(`/songs/${newSongName}`);
                return;
            } else {
                this.props.createNewSong({...this.state, songImgUrl: defaultSongImg});
            }
        } else {
            this.props.createNewSong(this.state);
        }
        this.props.history.push(`/songs/${this.state.songName}`);
    }
    componentDidMount() {
        document.title = "Create";
    }
    render() {
        return (
            <div className="container new-song-container">
                <h1 className="new-song-title">You're A New Song Baby</h1>
                <div className="form-fields-box">
                    <InputField 
                        labelId="songName"
                        labelText="Name"
                        value={this.state.songName}
                        handleChangeFunc={this.handleInputChange}
                    />
                    <InputField 
                        labelId="songType"
                        labelText="Song Type"
                        isSelect
                        selectVal={this.state.songType}
                        handleChangeFunc={this.handleSwitchChange}
                    />
                    <InputField 
                        labelId="songImgUrl"
                        labelText="Image Link"
                        handleChangeFunc={this.handleInputChange}
                    />
                    <InputField 
                        labelId="songLyrics"
                        labelText="Lyrics"
                        lyricsBox
                        value={this.state.songLyrics}
                        handleChangeFunc={this.handleInputChange}
                    />
                    <button 
                        className="submit-btn"
                        onClick={this.submitNewSong}
                    >
                        Create
                    </button>
                    <br />
                    <button
                        className="submit-btn"
                        onClick={() => this.props.history.push("/")}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.songs
    }
}

export default connect(mapStateToProps, {createNewSong})(NewSong);