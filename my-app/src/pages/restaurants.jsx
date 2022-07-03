import {useParams, NavLink} from 'react-router-dom'
import { useQuery } from '@apollo/client/react/hooks';
import {RESTAURANT}from '../Query'

function Restaurants(){
    const { catID } = useParams();
    const { data } = useQuery(RESTAURANT, { variables: { catID: catID || 1 } });
 
    return(
        <>
            <div className="resContainerNat">
            <h2 className="resHeading">Restoranlardan tanlang</h2>
                    <div className="resWrapper">
                        {
                            data && data.filterRes.map((e, i) => {
                                return  <NavLink className="a" to={`/restaurant/${e.id}`} id={e.id} key={i}>
                                        <div className="resCard">
                                            <h3 className="subHeading">{e.name}</h3>
                                        </div> 
                                    </NavLink>
                                         
                            })  
                        }
                    </div>
            </div>
        </>
    )
}
export default Restaurants;