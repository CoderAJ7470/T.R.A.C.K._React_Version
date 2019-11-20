import React from 'react';

import helpPanelStyles from '../CSS/helpPanel.module.css';

export default function About() {
  return (
    <>
      <h4 className={helpPanelStyles['']}>
        The following sections are a guide to each of the different features of the T.R.A.C.K.
        Please take a look at each section to see how this app works.
      </h4>

      <div className={helpPanelStyles['info']}>
        <section>
          <h3>1. Tabs</h3>
          <img src={require('../Assets/tabs.png')} alt='tabs for switching'/>
          <p>Tabs have been included to allow for easier functionality, and also allow for easier access to
            this help tab if needed.</p>
        </section>

        <section>
          <h3>2. Generating a new flight strip</h3>
          <img src={require('../Assets/inputs.png')} alt='input fields'/>
          <p>
            To generate a new flight strip, you will need to fill out all input fields as described below.
            NOTE: Special characters are not allowed in any of the fields.
          </p>
          <ul className={helpPanelStyles['inputInstructions']}>
            <li>Code: Enter a 2-letter (IATA) or 3-letter (ICAO) code, or any virtual airline code.
              There is no need to type in upper case as that will be done for you.
            </li>
            <li>FN (Flight Number): Enter a valid flight number. This can be any combination of letters/numbers.
              Typically this will be upto four numbers, or a combination of upto four letters/numbers.
            </li>
            <li>Acft (Aircraft Type): Enter the type of aircraft. This is pretty open-ended but you should stick
              with aircraft codes (e.g. B777, 772, A330, CR1 etc.). There is no need to type in upper case as
              that will be done for you.
            </li>
            <li>Alt (Cruising altitude): Enter the cruising altitude (either 2 or 3 numbers).
              E.g. 100 (10,000 ft), 070 (7,000 feet), 250 (25,000 ft) etc.
            </li>
            <li>Toggle Button (Departure/Arrival): Click this button to specify whether the flight strip should be
              placed in the departures column or arrivals column (see below)
            </li>
            <li>Go!: Once this button is clicked/tapped, it will generate a flight strip. The strip will contain all
              of the information that you entered, and place it in the departures column (left side) or the arrivals
              column (right side) depending on what you selected in the toggle button
            </li>
          </ul>
        </section>

        <section>
          <h3>3. Errors</h3>
          <img src={require('../Assets/fltStrips_error.png')} alt='error checks'/>
          <p>This app has very simple error checking, and is included more so as a help instead of a hindrance (hopefully).
          Referring to the image above, any erroneous inputs will be highlighted when the user clicks the Go! button.
          Additionally, an error message will pop up in the top right-hand-corner of the app. You can re-try once you have
          addressed all errors.</p>
        </section>

        <section>
          <h3>4. Quick resets</h3>
          <img src={require('../Assets/resets.png')} alt='reset buttons'/>
          <p>Referring to the image above (from left to right):</p>
            <ul>
              <li>
                "Reset Flight Strip Info" will clear out only the
                input fields
              </li>
              <li>
                "Reset Flight Strips" will delete all flight strips that are present in the flight table.
              </li>
              <li>
                "Reset All" will clear out all fields, reset the toggle button to "Departure" and clear out all
                errors
              </li>
            </ul>
        </section>
      </div>
    </>
  )
}