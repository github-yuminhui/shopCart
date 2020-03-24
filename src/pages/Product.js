import React, { Component } from 'react';
import { connect } from 'dva';
import "./styles.less"



class Product extends Component {

    add = () => {
        const { data, dispatch } = this.props
        let count = 1
        const obj = {
            ...data,
            count
        }
        if (localStorage.getItem("product")) {
            let product = JSON.parse(localStorage.getItem("product"))
            let id = []
            product.forEach(element => {
                id.push(element.id)
            })
            if (id.includes(data.id)) {
                const index = id.indexOf(data.id);
                product[index].count += 1
            } else {
                product.push(obj)
            }
            localStorage.setItem("product", JSON.stringify(product))
        } else {
            const product = []
            product.push(obj)
            localStorage.setItem("product", JSON.stringify(product))
        }
        dispatch({
            type: 'cart/local',
        });

    }

    render() {
        const { data } = this.props

        return (
            <div className='product' style={{ padding: 10 }} onClick={this.add} >
                {data.isFreeShipping && (
                    <div className="shelf-stopper">Free shipping</div>
                )}
                <img src={require(`../static/products/${data.sku}_1.jpg`)} alt={data.title} style={{ width: '100%' }} />
                <div style={{ textAlign: 'center' }}>
                    <p className='title' style={{ fontSize: 16, fontWeight: 'bold', lineHeight: '20px' }}>
                        {data.title}
                    </p>
                    <div><small>{data.currencyFormat}</small><b style={{ fontSize: 24, marginLeft: 5 }}>{data.price.toString().split('.')[0]}</b><span style={{ fontSize: 16 }}>.{data.price.toString().split('.')[1] || '00'}</span></div>
                    <div style={{ fontSize: 16, color: '#9c9b9b' }}><span>or {data.installments} x</span><b>${(data.price / data.installments).toFixed(2)}</b></div>
                    <div className='add' onClick={this.add}>Add to cart</div>
                </div>
            </div>
        )
    }
}

export default connect(({ cart }) => ({
    // local: cart.local,
}))(Product);
