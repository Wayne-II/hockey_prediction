import React from 'react';
import SkaterSelector from './SkaterSelector.js';

class TeamSkaters extends React.Component {
    getSkaterListItems(team_skaters) {

    }

    render() {
        return this.props.skaters.map(skater => {
            return <ul style={{  }}>
                <li style={{  }}>
                    <SkaterSelector
                        skater={skater}
                        selectedSkaters={this.props.selectedSkaters}
                        click={this.props.click}
                    />
                </li>
            </ul>;
        });
    }
}

export default TeamSkaters;