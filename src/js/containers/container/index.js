'use strict';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleComponent from 'components/component';
import * as actions from 'actions/action';

const propTypes = {
    data: PropTypes.array,
    user: PropTypes.object,
    actions: PropTypes.object,
    onClick: PropTypes.func,
    getData: PropTypes.func,
};
const defaultProps = {};

class Container extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        const { data, actions } = this.props;

        (!!data && !data.length) && actions.getData();
    }

    onClick() {
        const { actions } = this.props;

        const data = {
            emailaddress: "new.user1@mailinator.com",
            password: "1234qwer"
        };
        actions.login(data);
    }

    getData() {
        const { actions, user } = this.props;

        actions.getUser(user.guid);
    }

    render() {
        const { data, user } = this.props;

        return (
            <div>
                <SimpleComponent
                    data={data}
                    user={user}
                    onClick={this.onClick}
                    getData={this.getData}
                />
            </div>
        );
    }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

function mapStateToProps({reducer}) {
    return {
        data: reducer.data,
        user: reducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, actions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
