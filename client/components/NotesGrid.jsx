import React from 'react';
import {Component} from "react";

import Note from './Note.jsx';

import Masonry from 'react-masonry-component';
import Packery from 'react-packery-component';

import './NotesGrid.less';

class NotesGrid extends Component {
		constructor(props){
			super(props);

			this.state = {
				update: false
			}
		}
		
		render() {
			const masonryOptions = {
				itemSelector: '.Note',
				columnWith: 250,
				gutter: 10,
				isFitWith: true,
			};

			const packeryOptions = {
				itemSelector: '.Note',
    			transitionDuration: 0
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
							id={note.id}
							title={note.title}
							onUpdate={this.props.onNoteUpdate}
							onDelete={this.props.onNoteDelete.bind(null, note)}
							updateGrid={() => this.setState({update: true})}
							color={note.color}
							text={note.text}
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