import React from 'react';
import preloader from '../../../assets/images/preloader.svg';

type PropsType = {};

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloader} style={{ width: 150, height: 150 }} />
        </div>
    );
};

export default Preloader;
