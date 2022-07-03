import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react';
import { FOODS, ORDERS } from '../Query'
import { Context } from '../context/context'
import Selected from './selected';


function Food(){


    const { branchID } = useParams()
    const { data } = useQuery(FOODS, {variables: { branchID }})
    const { items, setItems } = useContext(Context);
    


    window.localStorage.setItem('item', JSON.stringify(items))

    //add food to basket
    const hendleAddBasket = (e) => {
        const foodID = e.target.id;
        const foundFood = data.filterFood.find(e => e.id === foodID)
        setItems([...new Set([...items, foundFood])])
        console.log(foodID);
        console.log(foundFood);
    }
   
    

    return (
        <>
            <div className="foodContainer">
               <div><Selected/></div>
                <h2 className='foodHeading'>Taomlardan tanlang</h2>
                <div className="foodWrapper">
                    {
                        data && data.filterFood.map((e, i) => {
                            return <div className="foodCard" key={i}>
                                <img className='foodCard_img' src="https://picsum.photos/250/180" alt="" />
                                <h3 className='subHeading subHeading_food'>{e.name}</h3>
                                <h3 className='subHeading subHeading_food'>{e.price} so'm</h3>
                                <button className='foodCard_btn' id={e.id} onClick={(e) => hendleAddBasket(e)}>Add basket</button>
                            </div>
                        })
                    }
                </div>
            </div>
            
            

        </>
    )
}
export default Food;