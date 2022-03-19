import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SkaterSelector from './SkaterSelector.js';
import QuickAddInfo from './QuickAddInfo.js';

/**
 * TODO
 * focus back on input once button pushed with contents removed
 */

class QuickAddSearch extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind( this );
        this.state = {
            matched_skaters: [],
            showInfo:false
        };
    }
    inputChangeHandler(event) {
        if (!this.props.isLoading && event.target.value.length > 0) {
            let re = new RegExp(event.target.value, 'i');
            this.setState({
                matched_skaters: this.props.skaters.filter(skater => {

                    return skater.name.match(re) !== null;
                })
            });
        } else {
            this.setState({ matched_skaters: [] });
        }
    }

    handleInfoClick( event ){
        this.setState( { showInfo:!this.state.showInfo } )
    }

    render() {
        return <div style={{ flex: '0 0 100%',zIndex:99 }}>
            <input type="text" placeholder="Quick Add Player" onChange={this.inputChangeHandler} />
            <FontAwesomeIcon icon={faCircleInfo} onClick={this.handleInfoClick} />
            <QuickAddInfo showInfo={this.state.showInfo} />
            <ul style={{ listStyleType: 'none', padding: '0', position: 'absolute', backgroundColor: '#282c34' }}>
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

                    this.state.matched_skaters.map(skater => <li><SkaterSelector skater={skater} selectedSkaters={this.props.selectedSkaters} click={this.props.changeSelectedSkater} /></li>)
                }
            </ul>
        </div>
    }
}

export default QuickAddSearch;