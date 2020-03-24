import React, { Component } from 'react';

import {
    ShoppingCartOutlined
} from '@ant-design/icons';

import './styles.less'

class Quantity extends Component {



    render() {
        const { title, count } = this.props
        return (
            <>
                <div className='btn' onClick={this.showDrawer}>
                    <p style={{ color: '#fff', fontSize: 36, textAlign: 'center' }}> <ShoppingCartOutlined /></p>
                    <span className="bag__quantity">{count}</span>
                </div>
                {
                    title && title ? <h3>{title}</h3> : ''
                }

            </>

        )
    }

}
export default Quantity;
