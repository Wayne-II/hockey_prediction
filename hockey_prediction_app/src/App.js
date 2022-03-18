//import logo from './logo.svg';
import './App.css';
import React from 'react';

import SelectedSkaters from './SelectedSkaters.js';
//import SelectionOptions from './SelectionOptions';
import ScheduleSkaters from './ScheduleSkaters.js';
import QuickAddSearch from './QuickAddSearch.js';
import SkaterExtractor from './SkaterExtractor.js';

//TODO: replace input buttons with labeled buttons ( 0, 1, 2, 3 being the labels )
//TODO: extraction of <Hockey /> function(s) to component(s)
//TODO: extractoin of component(s) to separate files
//TODO: --extract delete style



class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = { selected_skaters: { 1:[], 2: [], 3:[] }, isLoading: true };
    this.changeSelectedSkater = this.changeSelectedSkater.bind( this );
  }

  componentDidMount(){
    //todo: separate - might as well use redux for fun
    //fetch app data from API( table scraper )
    fetch( 'https://hockey/tims/',{mode:'cors'} )
    .then( response => response.json() )
    .then( data => {
      this.setState( { ...data, isLoading: false } );
    } );
  }

  changeSelectedSkater( event ){  
    /**TODO: For some reason, when using FontAwesomeIcon component,
     * the target for the onclick could be either an svg or a
     * path.  The problem is that the data- attributes are within
     * the dataset of the svg element and not the path.  Figure out
     * how to better handle this.
     */
    let dataset = {};
    if( event.target.tagName === 'svg' ){
      dataset = event.target.dataset
    }
    if( event.target.tagName === 'path' ){
      dataset = event.target.parentElement.dataset;
    }

    let selection = parseInt( dataset.choice );
    let selection_filter = skater_name => dataset.name !== skater_name;
    let selected_skaters = {
      1: [ ...this.state.selected_skaters[ 1 ] ].filter( selection_filter ),
      2: [ ...this.state.selected_skaters[ 2 ] ].filter( selection_filter ),
      3: [ ...this.state.selected_skaters[ 3 ] ].filter( selection_filter )
    };

    if( selection !== 0 ){//todo: assumes valid number and is within range
      selected_skaters[ selection ].push( dataset.name );
    }

    this.setState( { selected_skaters } );
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={ { fontFamily: "Coffee Script" } }>Coffee-o-Matic</h1>
          <SkaterExtractor />
          <QuickAddSearch isLoading={ this.state.isLoading } skaters={ this.state.skaters } selectedSkaters={ this.state.selected_skaters } changeSelectedSkater={ this.changeSelectedSkater } />
          <SelectedSkaters isLoading={ this.state.isLoading } skaters={ this.state.skaters } selectedSkaters={ this.state.selected_skaters } changeSelectedSkater={ this.changeSelectedSkater } />
          <ScheduleSkaters isLoading={ this.state.isLoading } skaters={ this.state.skaters } selectedSkaters={ this.state.selected_skaters } schedule={ this.state.schedule } standings={ this.state.standings } teams={ this.state.teams } changeSelectedSkater={ this.changeSelectedSkater } />
        </header>
        
      </div>
    );
  }
}

export default App;
