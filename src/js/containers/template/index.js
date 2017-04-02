'use strict';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from 'actions/test';

const propTypes = {
    children: PropTypes.object,
    actions: PropTypes.object,
    message: PropTypes.string,
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
                <p>Header message - <b>{message}</b></p>
                { children }
            </div>
        );
    }
}

Template.propTypes = propTypes;
Template.defaultProps = defaultProps;

function mapStateToProps({hello}) {
    return {
        message: hello.message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);
