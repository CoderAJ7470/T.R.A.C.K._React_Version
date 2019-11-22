import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import trackPanelStyles from '../CSS/track_panel.module.css';
import FlightStrip from './FlightStrip';

export default function Header() {
  let [departuresArray, updateDepArray] = useState([]);
  let [arrivalsArray, updateArrArray] = useState([]);
  const [isDeparture, setStatusAsDep] = useState(true);
  const [statusButtonText, setButtonText] = useState('Departure');

  let [id, setID] = useState(1);
  const [codeInput, setCode] = useState('');
  const [fltNoInput, setFltNo] = useState('');
  const [acftTypeInput, setAcftType] = useState('');
  const [cruiseAltInput, setCruiseAlt] = useState('');

  const columnDepID = '1';
  const columnArrID = '2';
  let newDepArray = [];
  let newArrArray = [];
  let newID = '';

  const [valid, isItValid] = useState(true);
  const [codeValid, isCodeValid] = useState(true);
  const [fltNoValid, isFltNoValid] = useState(true);
  const [acftTypeValid, isAcftValid] = useState(true);
  const [cruiseAltValid, isCruiseAltValid] = useState(true);

  const codePattern = new RegExp('^[A-Za-z0-9]{2,3}$');
  const flightNumberPattern = new RegExp('^[0-9A-Z]+$');
  const cruiseAltPattern = new RegExp('^[0-9]{3}$');

  function toggleStatus() {
    isDeparture ? setStatusAsDep(false) : setStatusAsDep(true);
  }
  
  function codeIsValid() {
    if(!codePattern.test(codeInput)) {
      isCodeValid(false);
      return false;
    }

    isCodeValid(true);
    return true;
  }

  function fltNoIsValid() {
    if(!flightNumberPattern.test(fltNoInput)) {
      isFltNoValid(false);
      return false;
    }

    isFltNoValid(true);
    return true;
  }

  function acftTypeIsValid() {
    if(acftTypeInput === '') {
      isAcftValid(false);
      return false;
    }

    isAcftValid(true);
    return true;
  }

  function cruiseAltIsValid() {
    if(!cruiseAltPattern.test(cruiseAltInput)) {
      isCruiseAltValid(false);
      return false;
    }

    isCruiseAltValid(true);
    return true;
  }

  function setText(text) {
    switch(text) {
      case 'Departure':
        setButtonText('Arrival');
        break;
      case 'Arrival':
        setButtonText('Departure');
        break;
      default:
        break;
    }
  }

  // Allows you to specify the behavior of the Draggables after drag-and-drop
  function onDragEnd(result) {
    let draggedItem;
    const { destination, source } = result;

    if(!destination) {
      // want to delete the flight strip object from the array it was dragged from
      if(source.droppableId === columnDepID) {
        newDepArray = [...departuresArray];
        draggedItem = newDepArray.splice(source.index, 1)[0];
        
        manageArrays('refreshDepOrder');
      }
      else {
        newArrArray = [...arrivalsArray];
        draggedItem = newArrArray.splice(source.index, 1)[0];

        manageArrays('refreshArrOrder');
      }

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

  function addFlightStrip() {
    let code = codeIsValid();
    let fltNum = fltNoIsValid();
    let type = acftTypeIsValid();
    let cruiseAlt = cruiseAltIsValid();

    if(code && fltNum && type && cruiseAlt) {
      isItValid(true);

      createID();

      if(statusButtonText === 'Departure') {
        manageArrays('newDeparture');
      }
      else {
        manageArrays('newArrival');
      }

      clearInputs();
    }
    else {
      isItValid(false);
    }
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
            code: codeInput.toUpperCase(),
            fltNum: fltNoInput,
            type: acftTypeInput.toUpperCase(),
            cruiseAlt: cruiseAltInput,
            status: statusButtonText
          }
        ]);
        break;
      case 'newArrival':
        updateArrArray([...arrivalsArray,
          {
            id: newID,
            code: codeInput.toUpperCase(),
            fltNum: fltNoInput,
            type: acftTypeInput.toUpperCase(),
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

  function clearFlightTable() {
    updateDepArray([]);
    updateArrArray([]);
    setButtonText('Departure');
    setStatusAsDep(true);
  }

  function resetAll() {
    clearInputs();
    clearFlightTable();
    setStatusAsDep(true);
    isItValid(true);
    isCodeValid(true);
    isFltNoValid(true);
    isAcftValid(true);
    isCruiseAltValid(true);
  }

  return (
    <>
      <div className={trackPanelStyles['topPanel']}>
        <div>
          <h3>Terminal Region Airspace Control Kit (T.R.A.C.K.)</h3>
          <section className={trackPanelStyles['controls']}>
            <button className={trackPanelStyles['reset']} onClick={clearInputs}>
              Reset Flight Strip Info
            </button>
            <button className={trackPanelStyles['reset']} onClick={clearFlightTable}>
              Reset Flight Strips
            </button>
            <button className={trackPanelStyles['reset']} onClick={resetAll}>
              Reset All
            </button>
          </section>
        </div>

        <div id='errors' className={!valid ? trackPanelStyles['showError'] : trackPanelStyles['noError']}>
          Please correct the highlighted field/s
        </div>
      </div>

      <div className={trackPanelStyles['flightStrip']}>
        <fieldset>
          <legend>Generate a flight strip</legend>

          <label>Code:</label>
          <input type="text" value={codeInput} onChange={e => setCode(e.target.value)}
            className={codeValid ? trackPanelStyles['inputsNoErrors'] : trackPanelStyles['inputsWithErrors']}
            id='codeInput'/>

          <label>FN:</label>
          <input type="text" value={fltNoInput} onChange={e => setFltNo(e.target.value)}
            className={fltNoValid ? trackPanelStyles['inputsNoErrors'] : trackPanelStyles['inputsWithErrors']}/>

          <label>Acft:</label>
          <input type="text" value={acftTypeInput} onChange={e => setAcftType(e.target.value)}
            className={acftTypeValid ? trackPanelStyles['inputsNoErrors'] : trackPanelStyles['inputsWithErrors']}/>

          <label>Alt:</label>
          <input type="text" value={cruiseAltInput} onChange={e => setCruiseAlt(e.target.value)}
            className={cruiseAltValid ? trackPanelStyles['inputsNoErrors'] : trackPanelStyles['inputsWithErrors']}/>

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
              <div className={trackPanelStyles['flightColumn']}
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