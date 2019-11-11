import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";

export default class FlightStrip extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   fltInfo: this.props.fltInfo
    // }
  }

  render() {
    return (
      <Draggable draggableId={this.props.key} index={this.props.index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              {console.log('key is ', this.props.key)}
              {this.props.code} {this.props.number}
            </div>
            <div>
              {this.props.type} {this.props.altitude}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}