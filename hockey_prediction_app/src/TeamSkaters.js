import React from 'react';
import SkaterSelector from './SkaterSelector.js';

class TeamSkaters extends React.Component {
    getSkaterListItems(team_skaters) {

    }

    render() {
        const teamSkaters = this.props.skaters.map(skater => {
            return <li>
                <SkaterSelector
                    skater={skater}
                    selectedSkaters={this.props.selectedSkaters}
                    click={this.props.click}
                />
            </li>
        });
        return <ul style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',

        }}>
            {teamSkaters}
        </ul>;
    }
}

export default TeamSkaters;