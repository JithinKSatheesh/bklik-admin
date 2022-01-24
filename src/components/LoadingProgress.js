import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export const TableLoadingProgress = (props) => {

    return (
        <div className="w-full mx-auto">
            {props.text && 
            <div className="text-center pb-3">
               {props.text}
            </div>
            }
            <div>
                <LinearProgress color={props.color ? props.color : "secondary"} />
            </div>
        </div>
    );
};

export const KMSpinner = () => {
    return (
        <div className="w-full mx-auto text-center">
             <div className="cp-spinner cp-morph"></div>
        </div>
    )
}