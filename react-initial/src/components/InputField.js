import React from "react";
import Select from 'react-select';
import Dropzone from 'react-dropzone';

import "react-select/dist/react-select.css";

class InputField extends React.Component {
    passEventFunc = (event) => {
        this.props.handleChangeFunc(event);
    }
    handleFileDrop(acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                console.log(fileAsBinaryString);
                this.props.handleChangeFunc("songLyrics", fileAsBinaryString);
            };
            reader.readAsBinaryString(file);
        });
    }
    render() {
        return (
            <fieldset className="form-field">
                <label htmlFor={this.props.labelId}>{this.props.labelText}</label>
                {this.props.isSelect ?
                    <Select 
                        className="select-field"
                        name="songType"
                        value={this.props.selectVal}
                        searchable={false}
                        options={[
                            {value: "Jam", label: "Jam"},
                            {value: "Chill", label: "Chill"}
                        ]}
                        onChange={this.props.handleChangeFunc}
                    />
                    :
                    this.props.lyricsBox ?
                        <Dropzone 
                            className="dropzone"
                            activeClassName="dropzone-active"
                            accept="text/*"
                            disableClick
                            onDrop={this.handleFileDrop.bind(this)}
                        >
                            <textarea 
                                name="lyrics"
                                id="songLyrics"
                                value={this.props.value}
                                onChange={this.passEventFunc}
                            />
                        </Dropzone>
                        :
                        <input 
                            type="text"
                            id={this.props.labelId}
                            value={this.props.value}
                            onChange={this.passEventFunc}
                        />
                }
            </fieldset>
        )
    }
}

export default InputField;