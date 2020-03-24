import React, { Component } from 'react';
import { Select, Row, Col } from 'antd';
import { connect } from 'dva';

import Product from './Product'
import "./styles.less"

const { Option } = Select;

class Right extends Component {



    handleChange = (value) => {
        const { dispatch, filter } = this.props;
        dispatch({
            type: 'cart/filter',
            sort: value,
            payload: [
                ...filter
            ],
        });
    }

    render() {
        const { data, local } = this.props

        return (
            <div className='right'>
                <Row justify='space-between'>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>{local.length} Product(s) found.</Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>Order by
                    <Select defaultValue="noSelect" style={{ marginLeft: 10 }} onChange={this.handleChange}>
                            <Option value="noSelect">Select</Option>
                            <Option value="up">价格从低到高</Option>
                            <Option value="down">价格从高到低</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    {
                        data.data && data.data.map(item => {
                            return <Col xs={12} sm={12} md={12} lg={6} xl={6} key={item.id}><Product data={item}></Product></Col>
                        }
                        )
                    }
                </Row>
            </div>
        )
    }

}
export default connect(({ cart }) => ({
    local: cart.local,
}))(Right);
