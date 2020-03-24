import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'dva';

import GithubCorner from '../components/github/Corner';
import Left from './Left.js';
import Right from './Right.js';
import Cart from './Cart'
import "./styles.less"



class Shop extends Component {

  state = {
    data: {}
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const res = await dispatch({ type: 'cart/query' });
    // this.setState({
    //   data: res
    // })
    // console.log(res);
  }

  render() {
    // const { data } = this.state
    const { data } = this.props
    // console.log(this.props.data);
    return (
      <div className='shop'>
        <GithubCorner />
        {/* <div style={{ float: 'right', width: 50, height: 50, background: 'red' }}>123</div> */}
        <Cart />
        <div style={{ margin: '50px auto 0 auto' }}>
          <Row justify='center'>
            <Col sm={6} md={3} lg={3} xl={3} style={{ marginRight: 15 }}>
              <Left />
            </Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={14}>
              <Right data={data} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(({ cart }) => ({
  data: cart.data,
}))(Shop);
// export default connect((e) => {
//   console.log(e);
// })(Shop);