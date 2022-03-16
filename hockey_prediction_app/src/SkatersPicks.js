import React from 'react';
import SelectedSkater from './SelectedSkater.js';

class SkatersPicks extends React.Component {
    render(){
        let choices = this.props.skaters
        .filter( skater =>  this.props.selectedSkaters.find( skaterName => skaterName === skater.name ) )
        .sort( ( a, b ) => b.goals - a.goals );

        return <div>
            <h3>{ this.props.header }</h3>
            <ul style={ { listStyleType:'none', padding:0, margin:0 } }>
            {
                choices.map( skater => <SelectedSkater skater={ skater } click={ this.props.click } />)
            }
            </ul>
        </div>
    }
}

export default SkatersPicks;