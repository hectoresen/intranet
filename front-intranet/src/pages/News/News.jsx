import React from 'react';
import { Navbar } from '../../components';
import './News.scss';

const News = () => {
    return (
        <div className='news'>
            <div className='news__navbar'>
                <Navbar />
            </div>
            <div className='news__container'>
        {/* CONTAINER TODO */}
            </div>
        </div>
    )
}

export default News;