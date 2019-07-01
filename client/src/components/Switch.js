import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchesGroup({ handleChange, switchState, labelsArr }) {

const nameArr = ['partTime', 'fullTime', 'contract'];
const switches = labelsArr.map((el, i) => {
 return (        
         <FormControlLabel key={i}
           control={<Switch checked={switchState[nameArr[i]]} onChange={(event) => handleChange(nameArr[i], event)} value={nameArr[i]} />}
           label={el}
          />
)});

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Employment Type</FormLabel>
      <FormGroup>
        {/* <FormControlLabel
          control={<Switch checked={switchState.partTime} onChange={handleChange('partTime')} value="partTime" />}
          label="Part Time"
        />
        <FormControlLabel
          control={<Switch checked={switchState.fullTime} onChange={handleChange('fullTime')} value="full-time" />}
          label="Full Time"
        />
        <FormControlLabel
          control={
            <Switch checked={switchState.contract} onChange={handleChange('contract')} value="antoine" />
          }
          label="Contract"
        /> */}
        {switches}
      </FormGroup>
      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}