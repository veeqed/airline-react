import { useState, useEffect } from 'react'
import { getFetchData } from '../fetch/DataFetcher'

const BookSearchLayout = () => {
    const flight_url = import.meta.env.VITE_API_URL + 'flights'

    useEffect(() => {

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
            <div className="flight-rows">1</div>
            <div className="flight-rows">1</div>
            <div className="flight-rows">1</div>
            <div className="flight-rows">1</div>
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default BookSearchLayout