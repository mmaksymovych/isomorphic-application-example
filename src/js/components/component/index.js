'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';

const propTypes = {
    data: PropTypes.array,
    user: PropTypes.object,
    onClick: PropTypes.func,
    getData: PropTypes.func
};
const defaultProps = {};

const SimpleComponent = ({data, user, onClick, getData}) => {

    return (
        <div className="component">
            <h2>Dynamic data below</h2>
            <button onClick={onClick}>login</button>
            <button onClick={getData}>getUserData</button>
            {
                !!user && <p>{`${user.firstname} ${user.lastname}`}</p>
            }
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
