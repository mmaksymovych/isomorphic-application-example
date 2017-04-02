'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
    children: PropTypes.object,
    onClick: PropTypes.func,
    people: PropTypes.array
};
const defaultProps = {};

const SecondPage = ({onClick, people}) => {

    return (
        <div className="test">
            <h2>Second Page</h2>
            <Link
                to=""
            >
                <p>first page</p>
            </Link>
            <button onClick={onClick}>change message</button>
            {
                !!people && people.map((el) => {
                    return (
                        <p key={Math.random()}>{el.name}</p>
                    );
                })
            }
        </div>
    );
};

SecondPage.propTypes = propTypes;
SecondPage.defaultProps = defaultProps;

export default SecondPage;
