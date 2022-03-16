import React from 'react';
import SkatersPicks from './SkatersPicks.js';


/**
 * TODO
 * add ability to remove selected skaters from lists ( but not switch )
 */
class SelectedSkaters extends React.Component {
    render(){
      if( this.props.isLoading ){
        return "";
      }
      return <div style={ { 
        display: 'flex',
        flexDirection: 'row'
      } }>
        <SkatersPicks 
          header="1st picks" 
          skaters={ this.props.skaters } 
          selectedSkaters={ this.props.selectedSkaters[ 1 ] } 
          click={ this.props.changeSelectedSkater } 
        />
        <SkatersPicks 
          header="2nd picks" 
          skaters={ this.props.skaters } 
          selectedSkaters={ this.props.selectedSkaters[ 2 ] } 
          click={ this.props.changeSelectedSkater } 
        />
        <SkatersPicks 
          header="3rd picks" 
          skaters={ this.props.skaters } 
          selectedSkaters={ this.props.selectedSkaters[ 3 ] } 
          click={ this.props.changeSelectedSkater } 
        />
      </div>;
    }
  }

export default SelectedSkaters;