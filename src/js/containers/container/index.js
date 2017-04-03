'use strict';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleComponent from 'components/component';
import * as actions from 'actions/action';

const propTypes = {
    data: PropTypes.array,
    actions: PropTypes.object
};
const defaultProps = {};

class Container extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { data, actions } = this.props;

        (!!data && !data.length) && actions.getData();
    }

    render() {
        const { data } = this.props;

        return (
            <div>
                <SimpleComponent
                    data={data}
                />
            </div>
        );
    }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

function mapStateToProps({reducer}) {
    return {
        data: reducer.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, actions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
