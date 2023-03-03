import { Button, dividerClasses } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { storage, db } from "./firebase"
import firebase from 'firebase/compat/app';
import Post from './Post';
import { render } from 'react-dom';


function UserProfile() {

  const [search, setSearch] = useState('');
  // useEffect(() =>[

  // ])
  // console.log(username)
  // <Post user={search}/>
  var temp

  const handleSearch = (e) => {

    const profiles = firebase.firestore().collection("posts")
    profiles.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => { return { ...doc.data() } })
      console.log(data)

      for (let i in data) {
        if (search === data[i].username) {
          var c, u, im
          temp = [c = data[i].caption, im = data[i].imgurl, u = data[i].username]
          console.log(temp);
          render(
            <div className='temp'>
              <h1>{u}</h1>
              <img src={im}></img>
              <p>{c}</p>
            </div>
            // <div>HI</div>
          )
        }
      }
    })
    // console.log(temp) 
  }

  return (

    <div>
      <input placeholder='Enter a caption...' onChange={e => setSearch(e.target.value)} value={search} type="text" />
      <Button onClick={handleSearch}>Search</Button>
      {/* <Post user={search} /> */}

    </div>

    // <div>
    //     <input placeholder='Enter a caption...' onChange={e => setSearch(e.target.value)} value={search} type="text" />
    //     {/* <Button onClick={handleSearch}>Search</Button> */}

    // </div>
  )
}

export default UserProfile