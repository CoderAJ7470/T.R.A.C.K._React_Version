import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import trackPanelStyles from '../CSS/track_panel.module.css';
import FlightStrip from './FlightStrip';

export default function Header() {
  let [departuresArray, updateDepArray] = useState([]);
  let [arrivalsArray, updateArrArray] = useState([]);
  const [isDeparture, setStatus] = useState(true);
  const [statusButtonText, setButtonText] = useState('Departure');

  // keys for flight strip object
  let [id, setID] = useState(1);
  const [codeInput, setCode] = useState('');
  const [fltNoInput, setFltNo] = useState('');
  const [acftTypeInput, setAcftType] = useState('');
  const [cruiseAltInput, setCruiseAlt] = useState('');
  const [status, updateStatus] = useState('');

  useEffect(() => {
    console.log('dep: ', departuresArray)
    console.log('arr: ', arrivalsArray);
  }, [departuresArray, arrivalsArray])

  // let codesArray = ['ABJ', 'ABL', 'GBL', 'HVN', 'RGL', 'STE', 'STR', 'THI'];

  const columnDepID = '1';
  const columnArrID = '2';
  let newDepArray = [];
  let newArrArray = [];

  let newID = '';

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
        break;
    }
  }

  function onDragEnd(result) {
    let draggedItem;
    const { destination, source } = result;

    if(!destination) {
      return;
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if(source.droppableId === columnDepID && destination.droppableId === columnArrID) {
      newDepArray = [...departuresArray];
      newArrArray = [...arrivalsArray];

      draggedItem = newDepArray.splice(source.index, 1)[0];
      draggedItem.status = 'Arrival';

      newArrArray.splice(destination.index, 0, draggedItem);

      manageArrays('refreshDepOrder');
      manageArrays('refreshArrOrder');
    }
    else if(source.droppableId === columnArrID && destination.droppableId === columnDepID) {
      newArrArray = [...arrivalsArray];
      newDepArray = [...departuresArray];

      draggedItem = newArrArray.splice(source.index, 1)[0];
      draggedItem.status = 'Departure';

      newDepArray.splice(destination.index, 0, draggedItem);

      manageArrays('refreshArrOrder');
      manageArrays('refreshDepOrder');
    }
    else if(destination.droppableId === columnDepID && destination.index !== source.index) {
      newDepArray = [...departuresArray];

      draggedItem = newDepArray.splice(source.index, 1)[0];

      newDepArray.splice(destination.index, 0, draggedItem);

      manageArrays('refreshDepOrder');
    }
    else if(destination.droppableId === columnArrID && destination.index !== source.index) {      
      newArrArray = [...arrivalsArray];

      draggedItem = newArrArray.splice(source.index, 1)[0];

      newArrArray.splice(destination.index, 0, draggedItem);

      manageArrays('refreshArrOrder');
    }
  }

  function validateInput() {
    // validate all input fields
  }

  function addFlightStrip() {
    createID();

    if(statusButtonText === 'Departure') {
      manageArrays('newDeparture');
    }
    else {
      manageArrays('newArrival');
    }

    clearInputs();
    document.getElementById('codeInput').focus();
  }

  const createID = () => {
    setID(id + 1);
    newID = id;
    newID = newID.toString();
  }

  // create a departures object and push it to the departures array
  function manageArrays(code) {
    switch(code) {
      case 'newDeparture':
        updateDepArray([...departuresArray,
          {
            id: newID,
            code: codeInput,
            fltNum: fltNoInput,
            type: acftTypeInput,
            cruiseAlt: cruiseAltInput,
            status: statusButtonText
          }
        ]);
        break;
      case 'newArrival':
        updateArrArray([...arrivalsArray,
          {
            id: newID,
            code: codeInput,
            fltNum: fltNoInput,
            type: acftTypeInput,
            cruiseAlt: cruiseAltInput,
            status: statusButtonText
          }
        ]);
        break;
      case 'refreshDepOrder':
        departuresArray = [];
        updateDepArray([...newDepArray]);
        break;
      case 'refreshArrOrder':
        arrivalsArray = [];
        updateArrArray([...newArrArray]);
        break;
      default:
        return;
    }
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
          <legend>Generate a flight strip</legend>

          <input type="text" value={codeInput} onChange={e => setCode(e.target.value)}
            className={trackPanelStyles['codeInput']} id='codeInput'
            placeholder='Code...' />

          <input type="text" value={fltNoInput} onChange={e => setFltNo(e.target.value)}
            className={`${trackPanelStyles['inputs']} ${trackPanelStyles['fltNoInput']}`}
            placeholder='Flt No...' />

          <input type="text" value={acftTypeInput} onChange={e => setAcftType(e.target.value)}
            className={`${trackPanelStyles['inputs']} ${trackPanelStyles['acftCodeInput']}`}
            placeholder='Aircraft type...' />

          <input type="text"  value={cruiseAltInput} onChange={e => setCruiseAlt(e.target.value)}
            className={`${trackPanelStyles['inputs']}`}
            placeholder='Cruise altitude...' />

          <button
            className={isDeparture ?
              `${trackPanelStyles['departure']} ${trackPanelStyles['flightStripButtons']}` :
              `${trackPanelStyles['arrival']} ${trackPanelStyles['flightStripButtons']}`}
              onClick={ () => { toggleStatus(); setText(statusButtonText); } }>{statusButtonText}
          </button>

          <button
            className={`${trackPanelStyles['goButton']} ${trackPanelStyles['flightStripButtons']}`}
            onClick={addFlightStrip}>
            Go!
          </button>
        </fieldset>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={trackPanelStyles['flightStripTable']}>
          <Droppable droppableId={columnDepID}>
            {(provided) => (
              <div className={trackPanelStyles['flightColumn']}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {departuresArray.map((fltData, index) =>
                  <FlightStrip
                    fltData={fltData}
                    index={index}
                    flightId={fltData.id}
                    key={fltData.id}
                    code={fltData.code}
                    number={fltData.fltNum}
                    type={fltData.type}
                    altitude={fltData.cruiseAlt}
                    status={fltData.status} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={columnArrID}>
            {(provided) => (
              <div className={trackPanelStyles['flightColumns']}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {arrivalsArray.map((fltData, index) =>
                  <FlightStrip
                    fltData={fltData}
                    index={index}
                    flightId={fltData.id}
                    key={fltData.id}
                    code={fltData.code}
                    number={fltData.fltNum}
                    type={fltData.type}
                    altitude={fltData.cruiseAlt}
                    status={fltData.status} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  )
}