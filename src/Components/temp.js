{this.state.departures.map(depStrip => (
  <li key={depStrip.id}>
    <div>{depStrip.code} {depStrip.fltNum}</div>
    <div>{depStrip.type} FL{depStrip.cruiseAlt}</div>
  </li>
))}