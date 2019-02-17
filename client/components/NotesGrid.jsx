import React from 'react';
import {Component} from "react";

import Note from './Note.jsx';
import Masonry from 'react-masonry-component';
import './NotesGrid.less';

class NotesGrid extends Component {
		constructor(props){
			super(props);
		}
		
		render() {
			const masonryOptions = {
				itemSelector: '.Note',
				columnWith: 250,
				gutter: 10,
				isFitWith: true
			};
		
		return (
			<Masonry
				className='NotesGrid'
				options={masonryOptions}
			>
				{
					this.props.notes.map(note =>
						<Note
							key={note.id}
							title={note.title}
							onDelete={this.props.onNoteDelete.bind(null, note)}
							color={note.color}
						>
							{note.text}
						</Note>
					)
				}
			</Masonry>
		);
	}
};

export default NotesGrid;