import React from 'react';
import classses from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={classses.BuildControl}>
        <div className={classses.Label}>{props.label}</div>
        <button className={classses.Less} 
            onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classses.More} onClick={props.added}>More</button>
    </div>
);

export default BuildControl;