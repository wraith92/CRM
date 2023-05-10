import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
const InputDate = (props) => {
    return ( 
        <>
         <p>Date début d'action</p>
        <LocalizationProvider dateAdapter={AdapterMoment} >
            <Stack spacing={5}>
                <DesktopDatePicker
                    value={props.valueDate1}
                    onChange={props.handleChangeDate1}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
        </>  
     );
}
 
export default InputDate;