'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';

const propTypes = {
    data: PropTypes.array
};
const defaultProps = {};

const SimpleComponent = ({data}) => {

    return (
        <div className="component">
            <h2>Dynamic data below</h2>
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
