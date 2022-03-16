import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import './SkaterSelector.css';

class SkaterSelector extends React.Component {
  checkSelectedList(selectedList) {
    return selectedList && selectedList.filter(skaterName => this.props.skater.name === skaterName).length > 0;
  }

  //todo: remove inline style and create class
  generateButtonClass(choice) {
    let classes = ['SkaterSelectorButton_default'];
    if (
      choice in this.props.selectedSkaters
      && this.checkSelectedList(this.props.selectedSkaters[choice])
      ) {
      classes.push('SkaterSelectorButton_selected');
    }
    return classes;
  }

  render() {
    let selectors = this.props.removeOnly && this.props.removeOnly === "true" ? [] : [
      <FontAwesomeIcon icon={fa1} class={this.generateButtonClass(1).join(' ')} onClick={this.props.click} data-name={this.props.skater.name} data-choice="1" />,
      <FontAwesomeIcon icon={fa2} class={this.generateButtonClass(2).join(' ')} onClick={this.props.click} data-name={this.props.skater.name} data-choice="2" />,
      <FontAwesomeIcon icon={fa3} class={this.generateButtonClass(3).join(' ')} onClick={this.props.click} data-name={this.props.skater.name} data-choice="3" />
    ];
    return <div>
      <FontAwesomeIcon icon={faBan} class='SkaterSelectorButton_default' onClick={this.props.click} data-name={this.props.skater.name} data-choice="0" />
      {selectors}
      <span>
        {this.props.skater.goals} - {this.props.skater.name}
      </span>
    </div>
  }
}

export default SkaterSelector;