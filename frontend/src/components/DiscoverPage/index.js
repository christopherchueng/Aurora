import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './DiscoverPage.css'

const DiscoverPage = () => {
    const dispatch = useDispatch();


    useEffect(() => {

    }, [dispatch]);

    return (
        <div className='discover-ctn'>
            <h1>Here in Discover</h1>
            <div className='selection-field'>
                <div className='selection-field-title'>
                    <h2>Curated for you</h2>
                </div>
            </div>
        </div>
    );
}

export default DiscoverPage;
