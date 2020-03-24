import React, { Component } from 'react';
import { Button, Row, Col, Drawer, message } from 'antd';
import { connect } from 'dva';

import Quantity from '../components/quantity'
import './styles.less'
import pic1 from '../static/products/100_1.jpg'

import {
    CloseOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined
} from '@ant-design/icons';


class Cart extends Component {


    constructor(props) {
        super(props);
        this.state = { visible: false, auto: false };
        this.resize.bind(this);
    }

    componentDidMount() {
        this.screenChange();
        this.local()
    }

    //监听屏幕宽度

    screenChange() {
        window.addEventListener('resize', this.debounce(this.resize, 100));
    }

    //防抖

    debounce(func, wait) {
        let timeout;
        return function () {
            let context = this;
            let args = arguments;

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }

    resize = (e) => {
        if (e.target.innerWidth <= 640) {
            this.setState({
                auto: true
            })
        } else {
            this.setState({
                auto: false
            })
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    // 减

    reduce = (e) => {
        console.log(e);
        let product = JSON.parse(localStorage.getItem("product"))
        let id = []
        product.forEach(element => {
            id.push(element.id)
        })
        const index = id.indexOf(e);
        if (product[index].count === 1) {
            // 删除
            product.splice(index, 1)
        } else {
            product[index].count -= 1
        }
        localStorage.setItem("product", JSON.stringify(product))
        this.local()
    }

    // 加

    add = (e) => {
        let product = JSON.parse(localStorage.getItem("product"))
        let id = []
        product.forEach(element => {
            id.push(element.id)
        })
        const index = id.indexOf(e);
        product[index].count += 1
        localStorage.setItem("product", JSON.stringify(product))
        this.local()
    }

    // 删除
    delete = (e) => {
        let product = JSON.parse(localStorage.getItem("product"))
        let id = []
        product.forEach(element => {
            id.push(element.id)
        })
        const index = id.indexOf(e);
        product.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(product))
        this.local()
    }

    // 触发modal渲染页面

    local = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'cart/local',
        });
    }

    total = (arr) => {
        let total = []
        arr.forEach(element => {
            total.push(element.price * element.count)
        })

        let s = 0;
        total.forEach(function (val, idx, arr) {
            s += val;
        }, 0);

        return s.toFixed(2);
    }

    message = () => {
        const { local } = this.props
        const total = this.total(local)
        message.success(`总价为${total}美元`);
    }

    // 清除监听

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);

    }

    render() {
        const { visible, auto } = this.state
        const { local } = this.props

        return (
            <div className='cart'>
                {
                    visible ? '' :
                        <div onClick={this.showDrawer}>
                            <Quantity count={local.length} />
                        </div>
                }
                <Drawer
                    className='drawer'
                    placement="right"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={auto ? '100%' : '440px'}
                    bodyStyle={{ background: '#1b1a20', position: 'relative' }}
                >
                    <div className='title'>
                        <Quantity title='Cart' count={local.length} />
                    </div>
                    {
                        local.map(item =>
                            <div className="products" key={item.id} style={{ width: '100%', color: '#fff', fontSize: 16, marginBottom: 10 }}>
                                <Row gutter={12}>
                                    <Col span={5}><img src={require(`../static/products/${item.sku}_1.jpg`)} alt="" style={{ width: '100%', verticalAlign: 'middle' }} /></Col>
                                    <Col span={14} style={{ fontWeight: 500 }}>
                                        <p >{item.title}</p>
                                        <div style={{ color: '#5b5a5e' }}>
                                            <p>{`${item.availableSizes[0]} | ${item.style}`}</p>
                                            <p>Quantity: {item.count}</p>
                                        </div>
                                    </Col>
                                    <Col span={5} style={{ textAlign: 'right' }}>
                                        <p className='close' onClick={() => this.delete(item.id)}><CloseOutlined /></p>
                                        <p className='price'>{item.currencyFormat} {item.count * item.price}</p>
                                        <div style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }}>
                                            <span><MinusSquareOutlined onClick={() => this.reduce(item.id)} /></span>
                                            <span style={{ marginLeft: 5 }}>
                                                <PlusSquareOutlined onClick={() => this.add(item.id)} /></span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )

                    }

                    <div className='checkout'>
                        <Row justify='space-around'>
                            <Col style={{ fontSize: 16 }}>SUBTOTAL</Col>
                            <Col style={{ textAlign: 'right' }}>
                                <p className='price' style={{ fontSize: 22 }}>$ {this.total(local)}</p>
                            </Col>
                        </Row>
                        <div style={{ textAlign: 'center', marginTop: 40 }}>
                            <Button block={true} onClick={() => this.message()}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </div >
        )
    }

}
export default connect(({ cart }) => ({
    local: cart.local,
}))(Cart);
