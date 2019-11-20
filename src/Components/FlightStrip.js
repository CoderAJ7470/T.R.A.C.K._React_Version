import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";

import flightStripStyles from '../CSS/flightStrip.module.css';

export default class FlightStrip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable draggableId={this.props.flightId} index={this.props.index}>
        {(provided) => (
          <div className={this.props.status === 'Departure' ? flightStripStyles['depFltStrip'] : flightStripStyles['arrFltStrip']}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={flightStripStyles['topInfo']}>
              {this.props.code} {this.props.number} 
            </div>
            <div>
              {this.props.type} FL{this.props.altitude}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}