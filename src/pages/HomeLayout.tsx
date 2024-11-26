import { useState, useEffect } from 'react'
import CardDemo, { CardModel } from '../components/CardDemo'
import { TabBooking } from '../components/TabBooking'
import HeadLayout from './HeadLayout'
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { getFetchData } from '../fetch/DataFetcher'

const HomeLayout = () => {
    const card_url = import.meta.env.VITE_API_URL + 'promotion_homes'
    const [cardData, setCardData] = useState([])
    const [activeTab, setActiveTab] = useState("book");

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
    

    useEffect(() => {

        getFetchData(card_url)
        .then(card_list => {
            setCardData(card_list.data)
        })
    }, [])
      
    function tabClick(name: string) {
      setActiveTab(name)
      console.log(name)
    }

    return (
    <>
    <HeadLayout />

    <div className="main-content md:container md:mx-auto mt-4">

      <div className="home-tabs grid grid-cols-3 lg:grid-cols-6">
        {tabHeadData.map((item, index) => (
            <div className={activeTab == item.name ? 'tab-head active' : 'tab-head'}
              key={item.id}
              onClick={() => tabClick(item.name)} >
              {item.icon} {item.title}
            </div>
        ))}
      </div>
      <TabBooking />

      <div className="justify-center grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 px-4 py-4">
        {cardData.map((card, key) => <CardDemo key={key} card={card} />)}
      </div>
      
    </div>
    </>
    )
}

export default HomeLayout