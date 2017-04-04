'use strict';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    children: PropTypes.object,
    message: PropTypes.string
};
const defaultProps = {};

class Template extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, message } = this.props;

        return (
            <div>
                <h2>{message}</h2>
                {children}
            </div>
        );
    }
}

Template.propTypes = propTypes;
Template.defaultProps = defaultProps;

function mapStateToProps({reducer}) {
    return {
        message: reducer.message
    };
}

export default connect(mapStateToProps, null)(Template);
