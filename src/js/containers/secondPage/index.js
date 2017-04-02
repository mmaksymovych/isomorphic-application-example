'use strict';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SecondPage from 'components/common/secondPage';
import * as testActions from 'actions/test';

const propTypes = {
    actions: PropTypes.object,
    people: PropTypes.array
};
const defaultProps = {};

class SecondPageContainer extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { actions } = this.props;

        //actions.changeMessage('ChangedMessage' + Math.random());
        actions.getPeople();
    }

    render() {
        return (
            <SecondPage
                onClick={this.onClick}
                people={this.props.people}
            />
        );
    }
}

SecondPageContainer.propTypes = propTypes;
SecondPageContainer.defaultProps = defaultProps;

function mapStateToProps({hello}) {
    return {
        people: hello.people
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, testActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondPageContainer);
