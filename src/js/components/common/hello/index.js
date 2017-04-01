'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
    children: PropTypes.object,
};

const defaultProps = {};

const Hello = () => {

    return (
        <div className="test">
            <h2>Hello World!</h2>
            <Link
                to="hi"
            >
                <p>first page</p>
            </Link>
        </div>
    );
};

Hello.propTypes = propTypes;
Hello.defaultProps = defaultProps;

export default Hello;
