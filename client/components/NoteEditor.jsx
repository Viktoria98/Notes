import React from 'react';
import {Component} from "react";
import './NoteEditor.less';
import ColorPicker from './ColorPicker.jsx';


class NoteEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			text: '',
			color: '#FFFFFF'
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleNoteAdd = this.handleNoteAdd.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
	}

	handleTextChange(event) {
		this.setState({text: event.target.value});
	}

	handleTitleChange(event) {
		this.setState({title: event.target.value});
	}

	handleColorChange(color) {
        this.setState({ color });
    }

	handleNoteAdd() {
		const newNote = {
			title: this.state.title,
			text: this.state.text,
			color: this.state.color
		};

		console.log(this.props.onNoteAdd);
		this.props.onNoteAdd(newNote);
		this.setState({text: '', title: '', color: '#FFFFFF'});
	}

	render() {
		return (
			<div className = 'NoteEditor'>
				<input 
					type ='text'
					className = 'NoteEditor__title'
					placeholder = 'Enter title'
					value = {this.state.title}
					onChange = {this.handleTitleChange}
				/>
				<textarea 
					placeholder = 'Enter note text'
					rows = {5}
					className = 'NoteEditor__text'
					value = {this.state.text}
					onChange = {this.handleTextChange}
				/>
				<div className='NoteEditor__footer'>
					<ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
					<button 
						className = 'NoteEditor__button'
						disabled = {!this.state.text}
						onClick = {this.handleNoteAdd}
					>
						Add
					</button>
				</div>
			</div>
		);
	}
};

export default NoteEditor;