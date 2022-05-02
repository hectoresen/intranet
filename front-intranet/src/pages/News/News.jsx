import React, { useEffect } from 'react';
import { Navbar } from '../../components';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import './News.scss';

const News = ({dispatch, user}) => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const thirdDay = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
    const fourthDay = new Date(new Date().getTime() + 72 * 60 * 60 * 1000);

    useEffect(() =>{

    },[])

    const getStrDate = (date) =>{
        let day = date.getDate();
        let strDay = '';
        let month = date.getMonth() +1;
        let strMonth = '';
        let year = date.getFullYear();

        if(day.toLocaleString.length <2){
            strDay = `0${day}`
        }
        if(month.toLocaleString.length <2){
            strMonth = `0${month}`
        }
        return `${strDay}/${strMonth}/${year}`
    }

    const createNewsletter = (ev) =>{
        ev.preventDefault();
        navigate('/home/news/post');
    }


    return (
        <div className='news'>
            <div className='news__navbar'>
                <Navbar />
            </div>
            <div className='news__container'>
                <div className='news__container__dates'>
                    <div className='news__container__dates-card'>
                        <p>Boletin de noticias</p>
                        <span>{getStrDate(currentDate)}</span>
                    </div>
                    <div className='news__container__dates-card'>
                        <p>Boletin de noticias</p>
                        <span>{getStrDate(tomorrowDate)}</span>
                    </div>
                    <div className='news__container__dates-card'>
                        <p>Boletin de noticias</p>
                        <span>{getStrDate(thirdDay)}</span>
                    </div>
                    <div className='news__container__dates-card'>
                        <p>Boletin de noticias</p>
                        <span>{getStrDate(fourthDay)}</span>
                    </div>
                </div>
                <div className='news__container__news'>
                    {(user.role === "admin")
                    ?
                    <Button
                        type="submit"
                        margin="10px"
                        variant="contained"
                        onClick={createNewsletter}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Crear noticia
                    </Button>
                    :
                    ''
                    }
                <div className='news__container__news-new'>
                <Card sx={{ maxWidth: 600 }}>
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({
    user:state.auth.user,
})

export default connect(mapStateToProps)(News);