import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import FlightStrip from './FlightStrip';

export default class FlightList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departures: []
    }
  }

  // Gets the props from the parent component if the state on those props changes
  componentWillReceiveProps(nextProps) {
    this.setState({
      departures: nextProps.departures
    });
  }

  render() {
    return (
      <>
        <Droppable droppableId={this.props.key}>
          <div>
          </div>
        </Droppable>
      </>
    );
  }
}