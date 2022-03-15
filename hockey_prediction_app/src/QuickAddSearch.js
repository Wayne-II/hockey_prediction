import React from 'react';
import PlayerSelector from './PlayerSelector';

class QuickAddSearch extends React.Component{
    constructor( props ){
        super( props );
        this.inputChangeHandler = this.inputChangeHandler.bind( this );
        this.state = {
            matched_skaters: []
        };
    }
    inputChangeHandler( event ){
        console.log( 'QuickAddSearch::inputChangeHandler', event );
        if( !this.props.isLoading && event.target.value.length > 0 ){
            let re = new RegExp( event.target.value, 'i' );
            this.setState( { 
                matched_skaters: this.props.skaters.filter( skater => {

                    return skater.name.match( re ) !== null;
                } )
            } );
        } else {
            this.setState( { matched_skaters: [] } );
        }
    }
    render(){
        return <div>
            <input type="text" placeholder="Quick Add Player" onChange={ this.inputChangeHandler } />
            <ul>
                <span>Search Results</span>
                {
                    /** todo: display list of ALL playing skaters matching 
                     * filter.
                     * First filter (100%) will be MVP and will only check entire
                     * contents of input against each name on character change
                     * with a timeout of a fraction of a second ( TBD ).
                     * Second Filter ( var.% ) will take the number of spaces
                     * to check each individual "word" against each individual
                     * "word" to get matches.  If input has 2 words and matches
                     * only one word - confidence will be 50%.  If the input 
                     * has 3 words and only matches 2, confidence will be 66%.
                     * 
                     * 
                    */
                     
                   this.state.matched_skaters.map( skater => <li><PlayerSelector skater={ skater } selectedSkaters={ this.props.selectedSkaters } click={ this.props.changeSelectedSkater } />{ skater.name }</li> )
                }
            </ul>
        </div>
    }
}

export default QuickAddSearch;