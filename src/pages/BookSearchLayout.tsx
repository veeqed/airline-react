import { useState, useEffect } from 'react'
import { getFetchData } from '../fetch/DataFetcher'

export type FlightModel = {
  departure_format: string,
  arrival_format: string,
  price: number,
  route_code: string,
  airport_name_from: string,
  airport_name_to: string,
}

const BookSearchLayout = () => {
    let flight_url: string = import.meta.env.VITE_API_URL + 'flights?'
    const queryParameters = new URLSearchParams(window.location.search)
    const airport_from = queryParameters.get("airport_from")
    const airport_to = queryParameters.get("airport_to")
    const depart_date = queryParameters.get("depart_date")
    const return_date = queryParameters.get("return_date")
    const [flightData, setFlightData] = useState<FlightModel[]>([])

    useEffect(() => {
      let params_url: string = `sort=price&airport_from=${airport_from}&airport_to=${airport_to}`
      flight_url += params_url

      console.log(flight_url)

      getFetchData(flight_url)
        .then(flight_list => {
          
          let flightListData = flight_list.data

          setFlightData(flight_list.data)

          console.log(flight_list)
      })

    }, [])
      

    return (
    <div className="container" style={{maxWidth: 1200}}>
      <div className="justify-center grid grid-cols-1 lg:grid-cols-3" >
        <div className="..." style={{backgroundColor: 'green'}}>05</div>
        <div className="col-span-2" >

          <div className='grid grid-cols-2'>
            <div className='flight-title'>Sponsored departing flights</div>
            <div className='flight-sort'>Sort by :</div>
          </div>
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {flightData.map((item, index) => (
              <div key={index} className="flight-rows">
                <div>{item.departure_format}</div>
                <div>{item.arrival_format}</div>
                <div>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default BookSearchLayout