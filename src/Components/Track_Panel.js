import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import trackPanelStyles from '../CSS/track_panel.module.css';
import FlightStrip from './FlightStrip';

export default function Header() {
  const [isDeparture, setStatus] = useState(true);
  const [statusButtonText, setButtonText] = useState('Departure');

  const [id, setID] = useState(0);
  const [codeInput, setCode] = useState('');
  const [fltNoInput, setFltNo] = useState('');
  const [acftTypeInput, setAcftType] = useState('');
  const [cruiseAltInput, setCruiseAlt] = useState('');
  const [departuresArray, updateDepArray] = useState([]);
  const [arrivalsArray, updateArrArray] = useState([]);

  // let codesArray = ['ABJ', 'ABL', 'GBL', 'HVN', 'RGL', 'STE', 'STR', 'THI'];

  const columnDepID = '1';
  const columnArrID = '2';

  function toggleStatus() {
    isDeparture ? setStatus(false) : setStatus(true);
  }

  function setText(text) {
    let newText = text;

    switch(newText) {
      case 'Departure':
        newText = 'Arrival';
        setButtonText(newText);
        break;
      case 'Arrival':
        newText = 'Departure';
        setButtonText(newText);
        break;
      default:
        newText = 'Error';
        setButtonText(newText);
    }
  }

  function onDragEnd(result) {
    // re-order the column to which the item was dragged
  }

  function createFlightStrip() {
    if(statusButtonText === 'Departure') {
      addDepartureStrip();
    }
    else {
      addArrivalStrip();
    }

    clearInputs();
  }

  // create a departures object and push it to the departures array
  function addDepartureStrip() {
    updateDepArray([...departuresArray,
      {
        id: setID(id + 1),
        code: codeInput,
        fltNum: fltNoInput,
        type: acftTypeInput,
        cruiseAlt: cruiseAltInput
      }
    ]);
  }

  function addArrivalStrip() {
    // create an arrival strip and add to the arrivals array
  }

  function clearInputs() {
    setCode('');
    setFltNo('');
    setAcftType('');
    setCruiseAlt('');
  }

  return (
    <>
      <h3>Terminal Region Airspace Control Kit (T.R.A.C.K.)</h3>
      <section className={trackPanelStyles['controls']}>
        <button className={trackPanelStyles['reset']}>Reset Flight Strip Info</button>
        <button className={trackPanelStyles['reset']}>Reset Flight Strips</button>
        <button className={trackPanelStyles['reset']}>Reset All</button>
      </section>

      <div className={trackPanelStyles['flightStrip']}>
        <fieldset>
          <legend>Generate a flight strip...</legend>

          <input type="text" value={codeInput} onChange={e => setCode(e.target.value)}
            className={trackPanelStyles['codeInput']}
            placeholder='Enter a code...' />

          <input type="text" value={fltNoInput} onChange={e => setFltNo(e.target.value)}
            className={`${trackPanelStyles['inputs']} ${trackPanelStyles['fltNoInput']}`}
            placeholder='Enter Flt No...' />

          <input type="text" value={acftTypeInput} onChange={e => setAcftType(e.target.value)}
            className={`${trackPanelStyles['inputs']} ${trackPanelStyles['acftCodeInput']}`}
            placeholder='Enter aircraft type...' />

          <input type="text"  value={cruiseAltInput} onChange={e => setCruiseAlt(e.target.value)}
            className={`${trackPanelStyles['inputs']}`}
            placeholder='Enter cruise altitude...' />

          <button
            className={isDeparture ?
              `${trackPanelStyles['departure']} ${trackPanelStyles['flightStripButtons']}` :
              `${trackPanelStyles['arrival']} ${trackPanelStyles['flightStripButtons']}`}
              onClick={ () => { toggleStatus(); setText(statusButtonText); } }>{statusButtonText}
          </button>

          <button
            className={`${trackPanelStyles['goButton']} ${trackPanelStyles['flightStripButtons']}`}
            onClick={createFlightStrip}>
            Go!
          </button>
        </fieldset>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={columnDepID}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
                {departuresArray.map((fltData, index) =>
                  <FlightStrip
                    index={index}
                    key={fltData.id}
                    code={fltData.code}
                    number={fltData.fltNum}
                    type={fltData.type}
                    altitude={fltData.cruiseAlt} />)}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}