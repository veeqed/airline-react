import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { getFetchData } from '../fetch/DataFetcher'

export type AirportModel = {
  airport_id: number,
  airport_name: string,
  airport_code: string,
}

export type AirportOption = {
  data: string,
  label: string
}

export type BookingFormModel = {
  route_type: string,
  promotion_code: string,
  adult: string,
  child: string,
  infant: string,
  airport_from: string,
  airport_to: string,
  depart_date_format: string,
  return_date_format: string
}

export interface AirportProps {
  airports: AirportModel[]
}

export function TabBooking() {
  const navigate = useNavigate();
  const today = new Date();

  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = year + "-" + month + "-" + date;

  const endDate = addDays(today, 5)
  const nextMonth = endDate.getMonth()+1;
  const nextYear = endDate.getFullYear();
  const nextDate = endDate. getDate();
  const strEndDate = nextYear + "-" + nextMonth + "-" + nextDate;
  const [departDate, setDepartDate] = useState<Dayjs | null>(dayjs(currentDate));
  const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs(strEndDate));
  const [toAirportOption, setToAirportOption] = useState<AirportOption[]>([]);
  const [airportData, setAirportData] = useState([])
  const [airportToText, setAirportToText] = useState("")
  const [errorAirportFrom, setErrorAirportFrom] = useState("")
  const [errorAirportTo, setErrorAirportTo] = useState("")

  var initAirportOption: AirportOption = {data: "", label: ""}
  var airportAutocomplete: AirportOption[] = [initAirportOption]
  var airportListData: AirportModel[] = []

  const initFormData: BookingFormModel = {
    route_type: "1",
    promotion_code: "",
    adult: "1",
    child: "",
    infant: "",
    airport_from: "",
    airport_to: "",
    depart_date_format: "",
    return_date_format: ""
  }

  const [formData, setFormData] = useState(initFormData);

  const personOptions = [];

  for(let i=1; i<=9; i++)
  {
    personOptions.push(i)
  }

  function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAirportToChange = (event: any) => {
    
    const value = event.target.innerText

    setAirportToText(value)
    console.log(value)
  }

  const bookingSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {

    let isValidate = true

    event.preventDefault()
    
    formData.depart_date_format = (departDate) ? departDate.format('DD/MM/YYYY') : ""
    formData.return_date_format = (returnDate) ? returnDate.format('DD/MM/YYYY') : ""

    airportData.map((item: AirportModel, index) => {
      if (item.airport_name == airportToText)
      {
        formData.airport_to = item.airport_code
      }
    })

    if (formData.airport_from == "")
    {
      isValidate = false
      setErrorAirportFrom("required")
    }

    if (formData.airport_to == "")
    {
      isValidate = false
      setErrorAirportTo("required")
    }

    console.log(formData)

    if (isValidate)
    {
      let params_url: string = `sort=price&airport_from=${formData.airport_from}&airport_to=${formData.airport_to}&depart_date=${formData.depart_date_format}&return_date=${formData.return_date_format}`

      navigate('/flights/search/?' + params_url)
    }
  }

  useEffect(() => {
    const airport_url = import.meta.env.VITE_API_URL + 'airports'

    getFetchData(airport_url)
      .then(airport_list => {
        let airportListData = airport_list.data

        airportListData.map((item: AirportModel, index) => {
          airportAutocomplete.push({data: item.airport_code, label: item.airport_name})
        })

        setToAirportOption(airportAutocomplete)
        setAirportData(airport_list.data)
    })

  }, [])


  return (
    <div className="p-2">
    <form onSubmit={bookingSubmit} >

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <div>
          <FormControl fullWidth>
            <Select
              id="route_type" name="route_type" className="select-left" defaultValue="1"
              onChange={handleInputChange} value={formData.route_type}
            >
              <MenuItem key={1} value={1}>Round-trip</MenuItem>
              <MenuItem key={2} value={2}>One-way</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <TextField id="promotion_code" label="Promotion Code" 
            name="promotion_code" value={formData.promotion_code} onChange={handleInputChange} />
          </FormControl>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <FormControl fullWidth>
            <InputLabel id="passenger_type1">Adult</InputLabel>
            <Select
              labelId="passenger_type1"
              id="passenger_type1_select"
              label="Adult(12+)" 
              defaultValue = "1" 
              name="adult" 
              value={formData.adult} onChange={handleInputChange}
            >
              {personOptions.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
          <div>
          <FormControl fullWidth>
            <InputLabel id="passenger_type2">Child</InputLabel>
            <Select
              labelId="passenger_type2"
              id="passenger_type2_select"
              label="Child(2-11)" 
              defaultValue = "" 
              name="child" 
              value={formData.child} onChange={handleInputChange}
            >
              <MenuItem key={0} value=''></MenuItem>
              {personOptions.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
          <div>
          <FormControl fullWidth>
            <InputLabel id="passenger_type3">Infant</InputLabel>
            <Select
              labelId="passenger_type3"
              id="passenger_type3_select"
              label="Infant(2-11)" 
              defaultValue = "" 
              name="infant" 
              value={formData.infant} onChange={handleInputChange}
            >
              <MenuItem key={0} value=''></MenuItem>
              {personOptions.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <div>
          <FormControl fullWidth>
            <InputLabel id="place_from">From</InputLabel>
            <Select
              labelId="place_from"
              id="place_from_select"
              label="From"
              defaultValue = '' 
              className="select-left" name="airport_from" 
              value={formData.airport_from} onChange={handleInputChange}
            >
              <MenuItem key={0} value=''></MenuItem>
              {airportData.map((item: AirportModel, index) => (
                <MenuItem key={item.airport_id} value={item.airport_code}>{item.airport_name}</MenuItem>
              ))}

            </Select>
            <label className="error">{errorAirportFrom}</label>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <Autocomplete 
              onChange={handleAirportToChange} 
              disablePortal
              options={toAirportOption}
              renderInput={(params) => 
              <TextField name="airport_to" {...params} label="To" />} 
              
            />
            <label className="error">{errorAirportTo}</label>
          </FormControl>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker className="depart-date" label="Depart" name="depart_date"
              format="DD/MM/YYYY"
              defaultValue={dayjs(departDate)} 
              value={departDate}
              onChange={(newValue1) => setDepartDate(newValue1)}
            />
        </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker className="return-date" label="Return" name="return_date"
              format="DD/MM/YYYY" 
              defaultValue={dayjs(returnDate)} 
              value={returnDate}
              onChange={(newValue2) => setReturnDate(newValue2)}
            />
        </LocalizationProvider>
        </div>
      </div>

    </div>

    <div className="mt-4 flex flex-col items-center">

      <Button type="submit" className="search">Search</Button>

    </div>

    </form>

    </div>
  );
}