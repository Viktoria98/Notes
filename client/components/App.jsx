import React from 'react';
import {Component} from "react";

import NotesActions from '../actions/NotesActions';
import NotesStore from '../stores/NotesStore';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

function getStateFromFlux() {
	return {
		isLoading: NotesStore.isLoading(),
		notes: NotesStore.getNotes()
	};
}


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: getStateFromFlux().isLoading,
			notes: getStateFromFlux().notes
		} 

		this._onChange = this._onChange.bind(this);
		this.handleNoteAdd = this.handleNoteAdd.bind(this);
		this.handleNoteDelete = this.handleNoteDelete.bind(this);
		this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
	}

	componentWillMount() {
		NotesActions.loadNotes();
	}

	componentDidMount() {
		NotesStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		NotesStore.removeChangeListener(this._onChange);
	}

	handleNoteAdd(data) {
		NotesActions.createNote(data);
	}

	handleNoteDelete(note) {
		console.log(note);
		NotesActions.deleteNote(note.id);
	}

	handleNoteUpdate(note) {
		console.log(note);
		NotesActions.updateNote(note);
	}

	render() {
		return (
			<div className = 'App'>
				<h2 className='App__header'>NotesApp</h2>
				<NoteEditor onNoteAdd={this.handleNoteAdd} />
				<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} onNoteUpdate={this.handleNoteUpdate} />
			</div>
		);
	}

	_onChange() {
		this.setState(getStateFromFlux());
	}
};

export default App;