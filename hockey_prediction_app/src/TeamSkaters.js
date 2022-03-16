import React from 'react';
import SkaterSelector from './SkaterSelector.js';

class TeamSkaters extends React.Component {
    getSkaterListItems(team_skaters) {

    }

    render() {
        return this.props.skaters.map(skater => {
            return <li style={{ listStyleType: 'none', display: 'flex', alignItems: 'flex-start', textAlign: 'start' }}>
                <SkaterSelector
                    skater={skater}
                    selectedSkaters={this.props.selectedSkaters}
                    click={this.props.click}
                />
            </li>;
        });
    }
}

export default TeamSkaters;