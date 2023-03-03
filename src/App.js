import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import firebase from 'firebase/compat/app';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import UserProfile from './UserProfile';
import { render } from '@testing-library/react';
// import { Unsubscribe } from '@mui/icons-material';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 4)
  },
}));
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setopenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(authUser);
        setUser(authUser);

        // if(authUser.displayName){

        // }
        // else{
        //   return auth.User.updateProfile({
        //     displayName: username,
        //   });
        // }
      }
      else {
        //user has logged out...
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  //   {
  //     username: "abc", 
  //     caption: "Comment1",
  //     imgurl: 'https://wallpaperaccess.com/full/367038.jpg'
  //   },
  //   {
  //     username: "abc", 
  //     caption: "Comment1",
  //     imgurl: 'https://cdn.mos.cms.futurecdn.net/9UmWCbyxpKaEGXjwFG7dXo.jpg'
  //   }
  // ]) 
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        posts: doc.data()
      })));

    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setopenSignIn(false);
  }

  var temp
  // const handleSearch = (e) =>{

  //   const profiles = firebase.firestore().collection("posts")
  //   profiles.get().then((querySnapshot) => {
  //     const data = querySnapshot.docs.map((doc) => {return {...doc.data()}})
  //     console.log(data)

  //     for (let i in data){
  //       if(search === data[i].username){
  //         var c,u,im
  //         temp = [c=data[i].caption, im=data[i].imgurl, u = data[i].username]
  //         console.log(temp);
  //         render(
  //           <div className='temp'>
  //             <h1>{u}</h1>
  //             <img src={im}></img>
  //             <p>{c}</p>
  //           </div>
  //           // <div>HI</div>
  //         )
  //       }
  //     }
  //   })
  //   // console.log(temp) 
  // }

  return (
    <div className="app">


      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <button onClick={() => setOpen(false)}>X</button>
          <form className='app__signup'>
            <center>
              <Input
                placeholder="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>SignUp</Button>
            </center>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setopenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <button onClick={() => setopenSignIn(false)}>X</button>
          <form className='app__signup'>
            <center>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </center>
          </form>
        </div>
      </Modal>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
          alt="Instagram"
        />
        {/* <UserProfile /> */}
        <div>
          {/* <input placeholder='Enter a caption...' onChange={e => setSearch(e.target.value)} value={search} type="text" /> */}
          {/* <Button onClick={handleSearch}>Search</Button> */}

        </div>

        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setopenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      </div>

      {user ? (
        <div className='app__posts'>
          {
            posts.map(({ id, posts }) => (
              <Post key={id} postId={id} user={user} username={posts.username} caption={posts.caption} imgurl={posts.imgurl} />
            ))
          }
        </div>) : (
        <h3>Sorry you need to login</h3>
      )}



      {/* <Post username="abc" caption="Comment1" imgurl='https://wallpaperaccess.com/full/367038.jpg' />
      <Post username="xyz" caption="Comment2" imgurl= "https://cdn.mos.cms.futurecdn.net/9UmWCbyxpKaEGXjwFG7dXo.jpg" />
      <Post username="pqr" caption="Comment3"/> */}

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login</h3>
      )}


    </div>
  );
}

export default App;
