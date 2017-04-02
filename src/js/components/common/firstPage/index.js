'use strict';
import './styles.scss';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
    children: PropTypes.object,
};

const defaultProps = {};

const FirstPage = () => {

    return (
        <div className="first">
            <h2>Hello World!</h2>
            <Link
                to="second"
            >
                <p>Second Page</p>
            </Link>
        </div>
    );
};

FirstPage.propTypes = propTypes;
FirstPage.defaultProps = defaultProps;

export default FirstPage;
