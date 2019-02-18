import React from 'react';
import {Component} from "react";
import UpdateNote from './UpdateNote.jsx';
import './Note.less';

class Note extends Component {
	constructor(props) {
		super(props);

        this.state = {
            isEdit: false
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
	}

    handleUpdate(newNote) {
        console.log(newNote);
        this.setState({isEdit: !this.state.isEdit});
        this.props.onUpdate(newNote);
    }

    updateGrid() {
        this.setState({isEdit: !this.state.isEdit});
        this.props.updateGrid();
    }


	render() {
		const style = {backgroundColor: this.props.color};

		return (
            <div className='Note' style={style}>
            {
                this.state.isEdit
                ?
                    <UpdateNote 
                        onUpdate={this.handleUpdate} 
                        title={this.props.title}
                        text={this.props.text}
                        color={this.props.color}
                        id={this.props.id} 
                    />
                :
                <div>
                    <span className='Note__edit-icon' onClick={this.updateGrid}> * </span>
                    <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                    {
                        this.props.title
                        ?
                            <h4 className='Note__title'>{this.props.title}</h4>
                        :
                            null
                        }
                        <div className='Note__text'>{this.props.children}</div>
                </div>
            }
            </div>
        );
	}
};

export default Note;