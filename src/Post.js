import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
// import Button from '@mui/material/Button';
import { db } from './firebase';
import firebase from 'firebase/compat/app';


export default function Post({ postId, user, username, caption, imgurl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');


  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);


  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');

  }
  
  return (
    <div className='post'>
      {/* header -> avatar, username */}
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt="Patel"
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48_D15dajn54gc0XScNceQXmamaf-F1vvxGVwG_X0wQ&s'
        />

        <h3>{username}</h3>
      </div>

      {/* image */}
      <img className='post__image' src={imgurl} alt='post' />

      {/* username, caption, like */}
      <h4 className='post__text'><strong>{username}</strong>{caption}</h4>

      {/* comments */}

      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>{comment.comment}
          </p>
        ))}
      </div>

      {user && (
        <form className='post__commentBox'>
          <input className='post__input' type="text" placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}


    
    </div>
  )
  
}

// export default Post
