import { useState, useEffect } from "react";
import './DiscoverPage.css'

const DiscoverPage = () => {
    return (
        <div className='discover-ctn'>
            <h1>Here in Discover</h1>
            <div className='selection-field'>
                <div className='selection-field-title'>
                    <h2>Curated for you</h2>
                </div>
                <div className='selection-field-tracks'>
                    <ul>
                        <li>Track 1</li>
                        <li>Track 2</li>
                        <li>Track 3</li>
                        <li>Track 4</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DiscoverPage;
