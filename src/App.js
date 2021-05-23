import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import './index.css';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isloading,setIsLoading] = useState(true);
  const [users,setUsers] = useState([]);
  const [readMore,setReadMore] = useState(false);

  const lets = async()=>{
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    setIsLoading(false);
  }

  useEffect(()=>{
    lets();
  },[])

  if(isloading){
    return <h2>Loading...</h2>
  }

  const handle = (id)=>{
    const newpeople = users.filter((user)=>{
      return user.id!==id
    });
    setUsers(newpeople);
  }

  return(
    <>
    <div className="title">
      <h2>Our Tours</h2>
      <div className="underline"></div>
    </div>
    {
      users.map((user)=>{
        const {id,name,info,image,price} = user;
        return(
          <article key={id} className="single-tour">
            <img src={image} alt={name} />
            <div className="tour-info">
              <h2>{name}</h2>
              <h3 className="tour-price">{price}</h3>
            </div>
            <p>{ readMore?info:`${info.substring(0,200)}..`
            }
            <button onClick={()=>setReadMore(!readMore)}>
              {readMore?'show less':'show more'}
            </button>
            </p>
            <button onClick={()=>handle(id)} className="delete-btn">Not Interested</button>
          </article>
        );
      })

    }
    <button onClick={()=>setUsers([])}  className="btn">Delete All</button>
    </>
  );
}

export default App
