'use strict';
import React, { PropTypes, Component } from 'react';
import Template from 'containers/template';
import Container from 'containers/container';

const propTypes = {};
const defaultProps = {};

const ServerContainer = () => {
    return (
        <Template>
            <Container/>
        </Template>
    );
};

ServerContainer.propTypes = propTypes;
ServerContainer.defaultProps = defaultProps;

export default ServerContainer;
