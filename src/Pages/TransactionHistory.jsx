import axios from 'axios'
import React from 'react'

export default class TransactionHistory extends React.Component{

    state = {
        dataTransaction: null,
        thisDate: null
    }

    componentDidMount(){
        this.getDataTransactions()
        this.getDueDate()
    }

    getDataTransactions = () => {
        let idUSer = localStorage.getItem('id')

        axios.get(`http://localhost:2000/transactions?idUser=${idUSer}&_sort=createdAt&_order=desc`)
        .then((res) => {
            this.setState({dataTransaction: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getDueDate = () => {
        let date = new Date()
        date = date.toString()
        let thisDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]
        
        this.setState({thisDate: thisDate})

        console.log(this.state.thisDate)
    }

    redirectPayment = (idTransaction) => {
        window.location = '/checkout/' + idTransaction
    }   

    render(){
        if(this.state.dataTransaction === null){
            return(
                <div>
                    <div className="container text-center mt-5 height-150 mb-5">
                        <div className="spinner-grow text-warning" style={{width: '3rem', height: '3rem'}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div className='container mt-3'>
                {
                    this.state.dataTransaction.map((value, index) => {
                        return(
                            <div className="row shadow py-4 mb-4 border border-light" style={{borderRadius: '5px'}} key={index}>
                                <div className="col-4">
                                    <h5 style={{lineHeight: '5px'}}>Status :</h5>
                                    {
                                        value.status === 'Paid'?
                                            <p className="text-success">{value.status} ({value.createdAt})</p>
                                        :
                                            <p className="text-danger">{value.status} ({value.createdAt})</p>
                                    }
                                </div>
                                <div className="col-4 text-center border-left border-right">
                                    <p>
                                        INV/{value.createdAt.split('-')[0]}/{value.createdAt.split('-')[1]}/{value.createdAt.split('-')[2].split(' ')[0]}/{value.id}
                                    </p>
                                </div>
                                <div className="col-4 text-right">
                                    {
                                        value.status === 'Unpaid'?
                                            <div>
                                                {
                                                    // 14-mar-2021 === 14-mar-2021
                                                    Number(this.state.thisDate.split('-')[0]) === Number(value.createdAt.split('-')[0])?
                                                        <div>
                                                            <input type='button' value='Pay Now' className='btn btn-primary' onClick={() => this.redirectPayment(value.id)} />
                                                            <p className="mt-2">Pay Before {Number(value.createdAt.split('-')[0])+ 1}-{value.createdAt.split('-')[1]}-{value.createdAt.split('-')[2].split(' ')[0]} 00:00:00</p>
                                                        </div>
                                                    :
                                                        <div className="text-danger font-weight-bold"> 
                                                            Cancelled 
                                                        </div>    
                                                }
                                            </div>
                                        :
                                            <p className="text-success font-weight-bold">
                                                Lunas
                                            </p> 
                                    }
                                </div>
                                {
                                    value.detail.map((value, index) => {
                                        return(
                                            <>
                                                <div className="col-2 mt-3 mb-4" key={index}>
                                                    {/* Image */}
                                                    <img src={value.productImage} width='100px' height='50px' alt="..." />
                                                </div>
                                                <div className="col-6 mt-3 mb-4">
                                                    {/* Detail Product */}
                                                    <h6 style={{lineHeight: '5px'}}>
                                                        {
                                                            value.productName
                                                        }
                                                    </h6>
                                                    <p>
                                                        {value.productQuantity} Item x Rp.{value.productPrice.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                                <div className="col-4 text-right mt-3 mb-4">
                                                    {/* Total Price Per-Product */}
                                                    <p>
                                                        Total Belanja
                                                    </p>
                                                    <h6>
                                                        Rp.{(value.productQuantity * value.productPrice).toLocaleString('id-ID')}
                                                    </h6>
                                                </div>
                                                <div className='col-12 border-bottom'>
                                                    
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}