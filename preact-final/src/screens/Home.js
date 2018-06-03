import React from "react";
import LazyLoad from 'react-lazyload';
import {Preloader, MediaBox} from "react-materialize";
import {connect} from "react-redux";

import "../styles/home.css";

class Home extends React.Component {
    navigate = (routeName, options) => {
        if(options && options.static) {
            this.props.history.push(routeName);
        } else {
            this.props.history.push(`songs/${routeName}`);
        }
    }
    renderSongs = () => {
        return this.props.songs.map((song) => {
            return (
                <div
                    key={song.name} 
                    className="song-box"
                >
                    <LazyLoad>
                        <img 
                            src={song.img} 
                            className="song-box-img"
                            alt={`Sketch for ${song.name}`}
                            onClick={() => this.navigate(song.name)}  
                        />
                    </LazyLoad>
                </div>
            )
        });
    }
    componentDidMount() {
        document.title = "Punk Songbook";
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div className="container home-container">
                <div className="title-box">
                    <LazyLoad>
                        <img
                            src="https://dl.dropboxusercontent.com/s/kg8v81mnu6p2fei/songbook-title-img1.png?dl=0"
                            alt="Add song to songbook button and title"
                            onClick={() => this.navigate("/new/song", {static: true})}
                        />
                    </LazyLoad>
                </div>
                {this.props.songs ?
                    <div className="song-grid">
                        {this.renderSongs()}
                    </div>
                    :
                    <div className="spinner">
                        <Preloader size="big" color="green" />
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

export default connect(mapStateToProps)(Home);