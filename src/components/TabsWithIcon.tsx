import { useState, useEffect } from 'react'
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
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Button from '@mui/material/Button';
import { getFetchData } from '../fetch/DataFetcher'

export type AirportModel = {
  airport_id: number,
  airport_name: string,
}

export interface AirportProps {
  airports: AirportModel[]
}

export type AirportOption = {
  id: number,
  label: string
}

var initAirportOption: AirportOption = {id: 0, label: ""}
var airportAutocomplete: AirportOption[] = [initAirportOption]

export function TabsWithIcon() {
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

  console.log(currentDate)

  const [finishLoad, setFinishLoad] = useState(false);
  const [activeTab, setActiveTab] = useState("book");
  const [departDate, setDepartDate] = useState(currentDate);
  const [returnDate, setReturnDate] = useState(strEndDate);
  const [fromAirportId, setFromAirportId] = useState('');
  const [toAirportOption, setToAirportOption] = useState<AirportOption[]>([]);
  const [airportData, setAirportData] = useState([])
 
  const tabHeadData = [
    {
      id: 1,
      title: "BOOK",
      name: "book",
      icon: <LocalAirportIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
    {
      id: 2,
      title: "CHECK-IN",
      name: "checkin",
      icon: <BusinessCenterIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
    {
      id: 3,
      title: "TIMEABLE",
      name: "timeable",
      icon: <CalendarMonthIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
    {
      id: 4,
      title: "FLIGHT STATUS",
      name: "flight_status",
      icon: <FlightTakeoffIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
    {
      id: 5,
      title: "MY BOOKING",
      name: "my_booking",
      icon: <PersonIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
    {
      id: 6,
      title: "MORE SERVICES",
      name: "more_services",
      icon: <BusinessIcon style={{ fontSize: 18, marginTop:-5 }} />,
    },
  ];

  const personOptions = [];

  for(let i=1; i<=9; i++)
  {
    personOptions.push(i)
  }

  function tabClick(name: string) {
    setActiveTab(name)
    console.log(name)
  }

  function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  function handleFromAirport(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value)
    setFromAirportId(event.target.value)
  }

  useEffect(() => {
    const airport_url = import.meta.env.VITE_API_URL + 'airports'

    getFetchData(airport_url)
      .then(airport_list => {
        let data = airport_list.data

        data.map((item: AirportModel, index) => {
          airportAutocomplete.push({id: item.airport_id, label: item.airport_name})
        })

        console.log(data)

        setToAirportOption(airportAutocomplete)
        setAirportData(airport_list.data)
    })

  }, [])


  return (
    <>
    <div className="home-tabs grid grid-cols-3 lg:grid-cols-6">
      {tabHeadData.map((item, index) => (
          <div className={activeTab == item.name ? 'tab-head active' : 'tab-head'}
            key={item.id}
            onClick={() => tabClick(item.name)} >
            {item.icon} {item.title}
          </div>
      ))}
    </div>

    <form>
    <div className="grid grid-cols-1 lg:grid-cols-4 mt-4">
      <div className="px-4">
        <Box>
          <FormControl fullWidth>
            <Select
              id="route_type" defaultValue={1} className="select-left"
            >
              <MenuItem key={1} value={1}>Round-trip</MenuItem>
              <MenuItem key={2} value={2}>One-way</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
      <Box>
        <FormControl fullWidth>
          <TextField id="promotion_code" label="Promotion Code" variant="outlined" />
        </FormControl>
      </Box>
      </div>
      <div className="col-span-2 tab-right" style={{paddingLeft: 20}}>
        <div className="grid grid-cols-3 gap-2">
          <div>
          <FormControl fullWidth>
            <InputLabel id="passenger_type1">Adult</InputLabel>
            <Select
              labelId="passenger_type1"
              id="passenger_type1_select"
              label="Adult(12+)" 
              defaultValue = "" 
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
            <InputLabel id="passenger_type2">Child</InputLabel>
            <Select
              labelId="passenger_type2"
              id="passenger_type2_select"
              label="Child(2-11)" 
              defaultValue = "" 
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
    </div>
    <div className="grid grid-cols-4 mt-4">
      <div className="px-4">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="place_from">From</InputLabel>
            <Select
              labelId="place_from"
              id="place_from_select"
              label="From" onChange={handleFromAirport} 
              defaultValue = '' 
              value={fromAirportId} 
              className="select-left"
            >
              <MenuItem key={0} value=''></MenuItem>
              {airportData.map((item: AirportModel, index) => (
                <MenuItem key={item.airport_id} value={item.airport_id}>{item.airport_name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
      <Box>
        <FormControl fullWidth>
        <Autocomplete
          disablePortal
          options={toAirportOption}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="To" />}
        />
      </FormControl>
      </Box>
      </div>
      <div className="col-span-2 tab-right">
      <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker className="depart-date" label="Depart" 
            format="DD/MM/YYYY"
            defaultValue={dayjs(departDate)} />
          <DatePicker className="return-date" label="Return" 
            format="DD/MM/YYYY" 
            defaultValue={dayjs(returnDate)}
          />
      </LocalizationProvider>
      </div>
    </div>

    <div className="mt-4 flex flex-col items-center">

      <Button type="submit" className="search">Search</Button>

    </div>

    </form>

    </>
  );
}