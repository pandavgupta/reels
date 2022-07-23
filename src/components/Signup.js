import * as React from 'react';
import { useState, useContext } from 'react';
import {AuthContext} from '../context/AuthContext'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Signup.css'
import insta from '../Assets/insta2.jpg'
// import {makeStyles} from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {makeStyles} from '@mui/styles'
import {Link,useNavigate} from 'react-router-dom'
import { database } from '../firebase';
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'

function Signup() {
    const  useStyles = makeStyles({
        text1:{
            color: 'gray',
            textAlign: 'center'
        },
        Card2:{
            margin: "0.5rem",
            padding: "0.7rem",
            textAlign: "center"

        }
    })
    const classes = useStyles();
    const {signup} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    function passdCheck(pass){
        if(password.length < 8) return true;
        let cap = 0;
        let sm = 0;
        let num = 0;
        for(let i = 0; i < password.length; i++){
            if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) cap++;
            if(password.charCodeAt(i) >=97 && password.charCodeAt(i) <= 122) sm++;
            if(password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) num++;
        }
        if(sm && cap  && num) return false;
        return true;

    }
    const handleSubmit = async()=>{
        if(passdCheck(password)){
            setError('Password format is incorrect');
                setTimeout(()=>{
                    setError('');
                },3000);
                return;
        }
        if(file === null){
                setError('image missing');
                setTimeout(()=>{
                    setError('');
                },3000);
                return;
        }
        if(name === '' || email ==='' || password === ''){
            setError('Field missing');
                setTimeout(()=>{
                    setError('');
                },3000);
                return;
        }
        try{
            setError('');
            setLoading(true);
            let userobj = await signup(email, password);
            let uid = userobj.user.uid;
            console.log(uid);
            const st = getStorage();
             const storageRef =  ref(st,`users/${uid}/profileImage`);
             const upload_task = uploadBytesResumable(storageRef, file);

             upload_task.on('state_changed',fn1, fn2, fn3);
            function fn1 (snapshot){
                console.log("progress")
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(" "+progress+"% done")
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default: console.log("wrong option");
                }
            }
            function fn2(error){
                setLoading(false)
                console.log("error",error);
                setError(error);
                setTimeout(()=>{
                    setError('');
                },3000);
                return;
            }
            function fn3(){
                console.log("success")
                getDownloadURL(upload_task.snapshot.ref).then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        name: name,
                        uid: uid,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    }).then((docRef) => {
                        console.log("Document written successfully.");
                    }).catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                });
                setLoading(false);
        
                history("/feed", { replace: true });
            }
            

        }catch(error){
            setLoading(false);
            setError(error);
            console.log(error)
            setTimeout(()=>{
                setError('');
            }, 3000);
            return ;
        }
    }

  return (
      <div className='signupWrapper'>
          <div className='signupCard'>
            <Card varient='outlined'>
                <div className='insta-logo'>
                    <img src={insta} alt="insta logo"/>
                </div>
                
                <CardContent>
                <Typography className={classes.text1} varient='outlined'>
                    Sign up to see photos and videos from your friends.
                </Typography>
                {error !=='' && <Alert severity="error">{error}</Alert>}
                <TextField id = "email_id" label="E-mail" variant="outlined" fullWidth={true} margin='dense' size='small'value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <TextField id = 'name_id' label="Full Name" variant="outlined" fullWidth={true}  margin='dense' size='small' value={name} onChange={(e)=>{setName(e.target.value)}} />
                <TextField  id = "password_id" label="Password" type="password" autoComplete="current-password" variant="outlined" fullWidth={true}  margin='dense' size='small'value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                
                <Button variant="outlined" color='secondary'  fullWidth={true} startIcon={<CloudUploadIcon/>} component='label'>
                    <input type='file' accept='image/*' onChange={(e)=>{setFile(e.target.files[0])}} hidden></input>
                    Upload profile image {uploadProgress}
                    </Button>
                </CardContent>
                <CardActions>
                    <Button color='primary' variant='contained' fullWidth={true}  disabled = {loading} onClick={handleSubmit}>Signup</Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1}>
                        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.Card2}>
                  <Typography>
                      Having an account ? <Link to='/login' style={{textDecoration:'none'}} >login</Link>
                  </Typography>
            </Card>
          </div>
      </div>
   
  )
}

export default Signup