import React from 'react';
import {Component} from "react";

import './UpdateNote.less';

class UpdateNote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.id,
			title: this.props.title,
			text: this.props.text,
			color: this.props.color
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
	}

	handleTitleChange(event) {
		this.setState({title: event.target.value});
	}

	handleTextChange(event) {
		this.setState({text: event.target.value});
	}

	handleNoteUpdate() {
		const newNote = {
			id: this.state.id,
			title: this.state.title,
			text: this.state.text,
			color: this.state.color
		};

		this.props.onUpdate(newNote);
	}


	render() {
		return (
			<div className = 'UpdateNote'>
				<input 
					type ='text'
					className = 'UpdateNote__title'
					value = {this.state.title}
					onChange = {this.handleTitleChange}
				/>
				<textarea 
					rows = {5}
					className = 'UpdateNote__text'
					value = {this.state.text}
					onChange = {this.handleTextChange}
				/>
				<button 
						className = 'UpdateNote__button'
						disabled = {!this.state.text}
						onClick = {this.handleNoteUpdate}
					>
						Save
				</button>
			</div>
		);
	}
}

export default UpdateNote;
