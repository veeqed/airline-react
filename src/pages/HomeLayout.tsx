import { useState, useEffect } from 'react'
import CardDemo, { CardModel } from '../components/CardDemo'
import { TabsWithIcon } from '../components/TabsWithIcon'
import { getFetchData } from '../fetch/DataFetcher'

const HomeLayout = () => {
    const card_url = import.meta.env.VITE_API_URL + 'promotion_homes'
    const airport_url = import.meta.env.VITE_API_URL + 'airports'
    const [cardData, setCardData] = useState([])
    

    useEffect(() => {

        getFetchData(card_url)
        .then(card_list => {
            setCardData(card_list.data)
        })
      }, [])

    return (
    <div className="main-content md:container md:mx-auto">
      <div className="justify-center grid grid-cols-1" >
        <TabsWithIcon />
      </div>
      <div className="justify-center grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 px-4 py-4">
        {cardData.map((card, key) => <CardDemo key={key} card={card} />)}
      </div>
      
    </div>
    )
}

export default HomeLayout