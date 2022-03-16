import React from 'react';
import SelectedSkater from './SelectedSkater.js';

class SkatersPicks extends React.Component {
    render() {
        let choices = this.props.skaters
            .filter(skater => this.props.selectedSkaters.find(skaterName => skaterName === skater.name))
            .sort((a, b) => b.goals - a.goals);

        return <div style={{
            flex: '0 0 33%',
            height: '12em',
            overflow: 'hidden',
            position:'relative'
        }}>
            <h3 style={{ padding: 0, margin: 0 }}>{this.props.header}</h3>
            <ul style={{
                position:'absolute',
                top:0,
                left:0,
                bottom:0,
                right:-17,
                overflowY:'scroll',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                listStyleType: 'none',
                padding: 0,
                margin: '1.5em 0 0 0'
            }}>
                {
                    choices.map(skater => <SelectedSkater skater={skater} click={this.props.click} />)
                }
            </ul>
        </div>
    }
}

export default SkatersPicks;