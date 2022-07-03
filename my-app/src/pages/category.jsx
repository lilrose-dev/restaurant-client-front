import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client/react';
import {CATEGORY} from '../Query'
import '../App.css'


function Category(){
    const { data } = useQuery(CATEGORY);
    return (
      <>
        <div className="catContainer">
            <h1 className="heading1">Saytimizga xush kelibsiz!</h1>
            <h2 className="heading2">Taom buyurma qilish uchun categoriyalardan birini tanlang!</h2>
            <div className="cardWrapper">
               {
                    data && data.categories.map((e, i) => {
                        return <NavLink className="a"  to={`/category/${e.id}`} id={e.id} key={i}>
                            <div className="card">
                                <h3 className='heading'>{e.name}</h3>
                            </div>
                        </NavLink>
                    })
               }

            </div>
            
        </div>
         
      </>
    )
}

export default Category;