import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

class SelectedSkater extends React.Component{
    render(){
        return <div>
            <FontAwesomeIcon 
                icon={ faBan } 
                style={ { width:'1em', heigh:'1em' } } 
                onClick={ this.props.click }
                data-name={this.props.skater.name} 
                data-choice="0" 
            />{ this.props.skater.name } { this.props.skater.goals }
        </div>;
    }
}

export default SelectedSkater;