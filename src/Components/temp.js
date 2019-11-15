{this.state.departures.map(depStrip => (
  <li key={depStrip.id}>
    <div>{depStrip.code} {depStrip.fltNum}</div>
    <div>{depStrip.type} FL{depStrip.cruiseAlt}</div>
  </li>
))}

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