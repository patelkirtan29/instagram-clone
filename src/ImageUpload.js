import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { storage, db } from "./firebase"
import firebase from 'firebase/compat/app';
import './ImageUpload.css' ;

function ImageUpload({username}) {
    const[image, setImage] = useState(null);
    // const[video, setVideo] = useState(null);
    const[progress, setProgress] = useState(0);
    const[caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
            // setVideo(e.target.files[0])
        }
    };


    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_cahnged",
            (snapshot) => {
                // progress function ... 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image in db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgurl: url,
                            username: username
                        });
                        // console.log(url)
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
        
    }

  return (
    <div>
        
        {/* caption Input */}
        {/* File Picker */}
        {/* Post Button */}
        <div className='imageUpload'>
            <progress className='progress' value={progress} max="100" />
            <input placeholder='Enter a caption...' onChange={e => setCaption(e.target.value)} value={caption} type="text" />
            <input type="file" onChange = {handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
            
        </div>
        
    </div>
  )
}

export default ImageUpload