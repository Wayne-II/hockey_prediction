import React from 'react';
import GameHeader from './GameHeader.js';
import TeamSkaters from './TeamSkaters.js';

class GameSkaters extends React.Component {
    render() {

        const teams = this.props.teams.split('-');

        return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <GameHeader teams={this.props.teams} />
            <TeamSkaters
                skaters={this.props.skaters[teams[0]]}
                selectedSkaters={this.props.selectedSkaters}
                click={this.props.click}
                team={teams[0]}
            />
            <TeamSkaters
                skaters={this.props.skaters[teams[1]]}
                selectedSkaters={this.props.selectedSkaters}
                click={this.props.click}
                team={teams[1]}
            />
        </div>
    }
}

export default GameSkaters;