import React, { Component } from 'react';
import './style.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.getFormattedDate(),
    };
  }

  componentDidMount() {
    this.update();
  }

  getFormattedDate(d = new Date()) {
    const dateParts = d.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  dateIsSet() {
    // Assumes an un-set date reduces to an empty string
    return this.state.date.length > 0;
  }

  previous() {
    const yesterday = new Date(this.state.date);
    yesterday.setDate(yesterday.getDate() - 1);
    this.setState({ date: this.getFormattedDate(yesterday) }, this.update);
  }

  next() {
    const tomorrow = new Date(this.state.date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({ date: this.getFormattedDate(tomorrow) }, this.update);
  }

  update() {
    if (!this.dateIsSet()) {
      return;
    }
    this.props.onUpdate({ from: this.state.date, to: this.state.date });
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value }, this.update);
  }

  render() {
    return (
      <div className='filter'>
        <button className='filter__button' onClick={this.previous.bind(this)} disabled={!this.dateIsSet()}>Previous</button>
        <input className='filter__date-input' type='date' value={this.state.date} onChange={this.handleDateChange.bind(this)}/>
        <button className='filter__button' onClick={this.next.bind(this)} disabled={!this.dateIsSet()}>Next</button>
      </div>
    );
  }
}

export default Filter;
