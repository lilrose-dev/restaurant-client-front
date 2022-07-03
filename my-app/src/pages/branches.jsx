import {useParams, NavLink} from 'react-router-dom'
import { useQuery } from '@apollo/client/react';
import {BRANCHES} from '../Query'

function Branches(){
    const {resID} = useParams()
    const {data} = useQuery(BRANCHES, { variables: {resID: resID}})
  
    return (
        <>
        <div className="resContainer">
            <h2 className='resHeading'>Restoran filiallaridan birini tanlang</h2>
            <div className="resWrapper">
                {
                    data && data.filtBranches.map((e, i) => {

                        return <NavLink to={`/branches/${e.id}`} className="a" id={e.id} key={i}>
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
export default Branches;