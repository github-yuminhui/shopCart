import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'dva';

import GithubStarButton from '../components/github/StarButton';
import "./styles.less"



class Left extends Component {

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        const { dispatch } = this.props;
        dispatch({
            type: 'cart/filter',
            payload: [
                ...checkedValues
            ],
            sort: this.props.sort
        });

    }

    render() {
        const plainOptions = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        return (
            <div className='left'>
                <h4>Size:</h4>
                <Checkbox.Group options={plainOptions} onChange={this.onChange} style={{ marginBottom: 15 }} />
                <GithubStarButton />
            </div>
        )
    }

}
export default connect(({ cart }) => ({
    sort: cart.sort,
}))(Left);
