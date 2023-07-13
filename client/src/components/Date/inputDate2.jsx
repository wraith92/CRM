import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
const InputDateFin = (props) => {
    return ( 
        <>
        <p>Date fin d'action</p>
       <LocalizationProvider dateAdapter={AdapterMoment} >
           <Stack spacing={5}>
               <DesktopDatePicker
                   value={props.valueDate2}
                   onChange={props.handleChangeDate2}
                   renderInput={(params) => <TextField {...params} />}
               />
           </Stack>
       </LocalizationProvider>
       </>  

     );
}
 
export default InputDateFin;