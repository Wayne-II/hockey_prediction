import React from 'react';
import SkatersPicks from './SkatersPicks.js';

class SelectedSkaters extends React.Component {
    render(){
      if( this.props.isLoading ){
        return "";
      }
  
      return <div style={ { 
        display: 'flex',
        flexDirection: 'row'
      } }>
        <SkatersPicks header="1st picks" skaters={ this.props.skaters } selectedSkaters={ this.props.selectedSkaters[ 1 ] } />
        <SkatersPicks header="2nd picks" skaters={ this.props.skaters } selectedSkaters={ this.props.selectedSkaters[ 2 ] } />
        <SkatersPicks header="3rd picks" skaters={ this.props.skaters } selectedSkaters={ this.props.selectedSkaters[ 3 ] } />
      </div>;
    }
  }

export default SelectedSkaters;