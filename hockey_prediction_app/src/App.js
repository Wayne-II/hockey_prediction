import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

class SelectedSkaters extends React.Component {
  render(){
    if( this.props.isLoading ){
      return "";
    }
    console.log( 'selected skaters props', this.props );
    //let firstChoice = [];
    let firstChoice = this.props.skaters
      .filter( skater =>  this.props.selectedSkaters[ 1 ].find( skaterName => skaterName === skater.name ) )
      .sort( ( a, b ) => b.goals - a.goals );//descending order
    let secondChoice = this.props.skaters
      .filter( skater =>  this.props.selectedSkaters[ 2 ].find( skaterName => skaterName === skater.name ) )
      .sort( ( a, b ) => b.goals - a.goals );//descending order
    let thirdChoice = this.props.skaters
      .filter( skater =>  this.props.selectedSkaters[ 3 ].find( skaterName => skaterName === skater.name ) )
      .sort( ( a, b ) => b.goals - a.goals );//descending order

    return <div style={ { 
      display: 'flex',
      flexDirection: 'row'
     } }>
      <div>
        <h3>1st choice</h3>
        <ul style={ { listStyleType:'none', padding:0, margin:0 } }>
          {
            firstChoice.map( skater => <li>{ skater.name }: { skater.goals }</li>)
          }
        </ul>
      </div>
      <div>
        <h3>2nd choice</h3>
        <ul style={ { listStyleType:'none', padding:0, margin:0 } }>
          {
            secondChoice.map( skater => <li>{ skater.name }: { skater.goals }</li>)
          }
        </ul>
      </div>
      <div>
        <h3>3rd choice</h3>
        <ul style={ { listStyleType:'none', padding:0, margin:0 } }>
          {
            thirdChoice.map( skater => <li>{ skater.name }: { skater.goals }</li>)
          }
        </ul>
      </div>
    </div>;
  }
}

class Hockey extends React.Component {
  getTeamSkaters( team ){
    var ret = this.props.skaters.filter( skater => {
      return skater.team === team;
    } );
    return ret;
  }

  getScheduledTeams(){
    let scheduled_teams = [];
    scheduled_teams = scheduled_teams.concat( ...this.props.schedule.map( scheduled_match => scheduled_match.split( '-' ) ) );
    return scheduled_teams;
  }

  getSkaterListItems( team_skaters ){
    return team_skaters.map( skater => {
      return <li style={{ listStyleType:'none', display:'flex', alignItems:'flex-start', textAlign:'start'}}>
        <input type="radio" name={skater.name} value="0" onChange={this.props.changeSelectedSkater} />
        <input type="radio" name={skater.name} value="1" onChange={this.props.changeSelectedSkater} />
        <input type="radio" name={skater.name} value="2" onChange={this.props.changeSelectedSkater} />
        <input type="radio" name={skater.name} value="3" onChange={this.props.changeSelectedSkater} />
        {skater.goals} - {skater.name}
      </li>;
    } );
  }

  getSkatersList(){
    //return skaters in descending order based on goals
    //return this.props.skaters[0].goals ;

    let scheduled_teams = this.getScheduledTeams();
    let skaters_by_team = {};

    Object.keys( this.props.teams ).map( team => skaters_by_team[ team ] = this.getTeamSkaters( team ) );
    Object.keys( skaters_by_team ).map( team => skaters_by_team[ team ].sort( ( skater1, skater2 ) => skater2.goals - skater1.goals ) );

    let skaters_lists = [];
    for( let team_idx = 0; team_idx < scheduled_teams.length; team_idx += 2 ){
      let first_wins = this.props.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] > 0;
      let match_tie = this.props.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] == 0;
      console.log( this.props.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] );
      let win_colour = match_tie ? "yellow" : "green";
      let lose_colour = match_tie ? "yellow" : "red";
      skaters_lists.push(
        <div style={{width:"33%",display:'flex', flexDirection:'column' } }>
          <span>{scheduled_teams[ team_idx ] } @ {scheduled_teams[ team_idx + 1 ] }</span>
          
          <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            <span style={ first_wins ? {color:win_colour, width:'50%'} : {color:lose_colour, width:'50%'}}>{scheduled_teams[ team_idx ] }</span>
            <span style={ first_wins ? {color:lose_colour, width:'50%'} : {color:win_colour, width:'50%'}}>{scheduled_teams[ team_idx + 1 ] }</span>
            <span style={ { width:'100%', display:'flex', flexWrap: 'no-wrap' } }>
              <span style={ { width:'50%', display:'flex', alignItems:'flex-start' } }>
                <span style={ { width: '1.4em' } }>0</span>
                <span style={ { width: '1.4em' } }>1</span>
                <span style={ { width: '1.4em' } }>2</span>
                <span style={ { width: '1.4em' } }>3</span>
              </span>
              <span style={ { width:'50%', display:'flex', alignItems:'flex-start' } }>
                <span style={ { width: '1.4em' } }>0</span>
                <span style={ { width: '1.4em' } }>1</span>
                <span style={ { width: '1.4em' } }>2</span>
                <span style={ { width: '1.4em' } }>3</span>
              </span>
            </span>
            <ul style={{display:"flex", flexDirection:"column",width:'50%', padding:0, margin:0, alignItems:"flex-start", justifyContent:"flex-start"}}>
              { 
                this.getSkaterListItems( skaters_by_team[ scheduled_teams[ team_idx ] ] )
              }
            </ul>
            <ul style={{display:"flex", flexDirection:"column",width:'50%', padding:0, margin:0, alignItems:"flex-start", justifyContent:"flex-start"}}>
              { 
                this.getSkaterListItems( skaters_by_team[ scheduled_teams[ team_idx + 1 ] ] )
              }
            </ul>
          </div>
        </div>
      );
    }

    return <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>{skaters_lists}</div>;
  }

  render(){
    if( this.props.isLoading ){
      return 'loading';
    }
    let skaters_list = this.getSkatersList();
    return <div>
      <span>skater picks</span>
      {skaters_list}
      </div>;
  }
}

class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = { selected_skaters: { 1:[], 2: [], 3:[] }, isLoading: true };
    this.changeSelectedSkater = this.changeSelectedSkater.bind( this );
  }

  componentDidMount(){
    fetch( 'https://hockey/tims/',{mode:'cors'} )
    .then( response => response.json() )
    .then( data => {
      console.log( 'data', data );
      this.setState( { ...data, isLoading: false } );
    } );
  }

  changeSelectedSkater( event ){

    console.log( 'App', event, this, event.target.value );
    
    let selection = parseInt( event.target.value );
    let selection_filter = skater_name => event.target.name !== skater_name;
    let selected_skaters = {
      1: [ ...this.state.selected_skaters[ 1 ] ].filter( selection_filter ),
      2: [ ...this.state.selected_skaters[ 2 ] ].filter( selection_filter ),
      3: [ ...this.state.selected_skaters[ 3 ] ].filter( selection_filter )
    };

    if( selection !== 0 ){
      selected_skaters[ selection ].push( event.target.name );
    }

    console.log( this.state, selected_skaters );
    this.setState( { selected_skaters } );
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Coffee-o-Matic</h1>
          <SelectedSkaters isLoading={ this.state.isLoading } skaters={ this.state.skaters } selectedSkaters={ this.state.selected_skaters } />
          <Hockey isLoading={ this.state.isLoading } schedule={ this.state.schedule } skaters={ this.state.skaters } standings={ this.state.standings } teams={ this.state.teams } changeSelectedSkater={ this.changeSelectedSkater } />
        </header>
        
      </div>
    );
  }
}
// function App() {
  
// }

export default App;
