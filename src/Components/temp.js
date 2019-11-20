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

let codesArray = ['ABJ', 'ABL', 'GBL', 'HVN', 'RGL', 'STE', 'STR', 'THI'];

if(!flightNumberPattern.test(fltNoInput)) {
      isItValid(false);
      isFltNoValid(false);
      // return false;
    }

  // if(acftTypeInput === '') {
  //   isItValid(false);
  //   isAcftValid(false);
  //   return false;
  // }

  // if(!cruiseAltPattern.test(cruiseAltInput)) {
  //   isItValid(false);
  //   isCruiseValid(false);
  //   return false;
  // }

const [valid, isItValid] = useState(true);
const [codeValid, isCodeValid] = useState(true);
const [fltNoValid, isFltNoValid] = useState(true);
const [acftTypeValid, isAcftValid] = useState(true);
const [cruiseAltValid, isCruiseValid] = useState(true);