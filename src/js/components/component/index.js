'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';

const propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func
};
const defaultProps = {};

const SimpleComponent = ({data, onClick}) => {

    return (
        <div className="component">
            <h2>Dynamic data below</h2>
            <button onClick={onClick}>get new data</button>
            {
                !!data && data.map((el) => {
                    return(
                        <p key={Math.random()}>{el}</p>
                    );
                })
            }
        </div>
    );
};

SimpleComponent.propTypes = propTypes;
SimpleComponent.defaultProps = defaultProps;

export default SimpleComponent;
