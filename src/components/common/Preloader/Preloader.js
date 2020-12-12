import React from 'react';
import preloader from '../../../assets/images/preloader.svg';

let Preloader = () => {
    return (
        <div>
            <img src={preloader} style={{ width: 150, height: 150 }} />
        </div>
    );
};

export default Preloader;
