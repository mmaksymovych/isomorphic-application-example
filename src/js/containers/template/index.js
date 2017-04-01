'use strict';
import React, { PropTypes, Component } from 'react';

const propTypes = {
    children: PropTypes.object,
};

const defaultProps = {};

class Template extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <p>header</p>
                { children }
            </div>
        );
    }
}

Template.propTypes = propTypes;
Template.defaultProps = defaultProps;

export default Template;
