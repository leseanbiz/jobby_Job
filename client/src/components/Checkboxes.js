import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
// }));

export default function CheckboxesGroup({ handleChange, switchState, labelsArr }) {

const nameArr = ['partTime', 'fullTime', 'contract'];
const checkboxes = labelsArr.map((el, i) => {
 return (        
         <FormControlLabel key={i}
           control={<Checkbox checked={switchState[nameArr[i]]} onChange={(event) => handleChange(nameArr[i], event)} value={nameArr[i]} />}
           label={el}
          />
)});

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Employment Type</FormLabel>
      <FormGroup>
        {checkboxes}
      </FormGroup>
      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}