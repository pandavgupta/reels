import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Login.css'
import insta from '../Assets/insta2.jpg'
import phone_frame from '../Assets/phone_frame.png'
// import {makeStyles} from '@mui/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {makeStyles} from '@mui/styles'
import {Link, useNavigate} from 'react-router-dom'
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import image0 from '../Assets/profile_image0.png'
import image1 from '../Assets/profile_image1.png'
import image2 from '../Assets/message1.png'
import image3 from '../Assets/status1.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { Email } from '@material-ui/icons';
function Login() {
    // const store = useContext(AuthContext);
    // console.log(store);
    const  useStyles = makeStyles({
        text1:{
            color: 'gray',
            textAlign: 'center'
        },
        text2:{
            textAlign: 'center'
        },
        Card2:{
            margin: "0.5rem",
            padding: "0.7rem",
            textAlign: "center"

        },
        Erorr_box:{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            textAlign: "center"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const {login} = useContext(AuthContext);
    const handle_sumbit = async()=>{
        try{
            setError('');
            setLoading(true);
             await login(email, password)
            setLoading(false)
            history("/feed", { replace: true });

        }catch(e){
            // setError(e.code+ ": ", e.message)
            setError(e)
            setTimeout(()=>{
                setError('');
            },3000);
            setLoading(false)
        }
    }

  return (
      <div className='loginWrapper'>
          <div className='SlideWrapper' style={{backgroundImage: 'url('+phone_frame+')', backgroundSize: "cover"}}>
               <div className='SliderCard'>
                <CarouselProvider
                        // visibleSlides={1}
                        totalSlides = {4}
                        naturalSlideHeight = {423}
                        naturalSlideWidth = {243}
                        // hasMasterSpinner ={true}
                        isPlaying ={true}
                        playDirection = {'forward'}
                        infinite = {true}
                        dragEnabled = {false}
                        // touchEnabled= {false}
                    >
                        <Slider className='slide_image'>
                        <Slide index={0}><img src={image0} alt="images"></img></Slide>
                        <Slide index={1}><img src={image1}  alt="images"></img></Slide>
                        <Slide index={2}><img src={image2}  alt="images"></img></Slide>
                        <Slide index={3}><img src={image3}  alt="images"></img></Slide>
                        </Slider>
                    </CarouselProvider>
               </div>
          </div>
          <div className='loginCard'>
            <Card varient='outlined'>
                <div className='insta-logo'>
                    <img src={insta} alt="insta logo"/>
                </div>
                
                <CardContent>
                    {error !== '' && <Alert severity="error" className={classes.Erorr_box} >{error}</Alert>}
                    <TextField id="email_id" label="E-mail" variant="outlined" fullWidth={true} margin='dense' size='normal' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField id="password_id" label="Password" type="password" autoComplete="current-password" variant="outlined" fullWidth={true}  margin='dense' size='normal' value={password} onChange={(p)=>{setPassword(p.target.value)}} />
                </CardContent>
                
                <CardActions>
                    <Button color='primary' variant='contained' fullWidth={true} onClick={handle_sumbit} disabled={loading} >Log in</Button>
                </CardActions>
                
                <CardContent>
                    <Typography className={classes.text2}>
                        <Link to='/forget' style={{textDecoration:'none'}}>Forget Password ?</Link>
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.Card2}>
                  <Typography>
                      Don't have an account ? <Link to='/signup' style={{textDecoration:'none'}} >Sign Up</Link>
                  </Typography>
            </Card>
          </div>
      </div>
   
  )
}

export default Login