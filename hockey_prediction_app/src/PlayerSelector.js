import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';

class PlayerSelector extends React.Component{
    checkSelectedList( selectedList ){
      return selectedList && selectedList.filter( skaterName => this.props.skater.name === skaterName ).length > 0;
    }

    //todo: remove inline style and create class
    generateStyle( choice ){
      let selectedStyle = {
        color: 'black',
        backgroundColor: 'white'
      }
      let defaultStyle = { width:'1em', height:'1em' }
      return this.checkSelectedList( this.props.selectedSkaters[ choice ] ) 
      ? Object.assign( defaultStyle, selectedStyle ) 
      : defaultStyle;
    }

    render(){
      //<input type="radio" name={skater.name} value="0" onChange={this.props.changeSelectedSkater} />

      return <div style={ { display:'flex', flexDirection:'row', padding:0, width:'8em', justifyContent:'space-evenly' } } >
        <FontAwesomeIcon icon={ faBan } style={ this.generateStyle( 0 ) } onClick={ this.props.click } data-name={this.props.skater.name} data-choice="0" />
        <FontAwesomeIcon icon={ fa1 } style={ this.generateStyle( 1 ) } onClick={ this.props.click } data-name={this.props.skater.name} data-choice="1" />
        <FontAwesomeIcon icon={ fa2 } style={ this.generateStyle( 2 ) } onClick={ this.props.click } data-name={this.props.skater.name} data-choice="2" />
        <FontAwesomeIcon icon={ fa3 } style={ this.generateStyle( 3 ) } onClick={ this.props.click } data-name={this.props.skater.name} data-choice="3" />
      </div>
    }
  }

export default PlayerSelector;