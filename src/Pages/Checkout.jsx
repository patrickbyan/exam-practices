import React from 'react'
import Axios from 'axios'
import linkTransactions from '../Supports/Constants/linkTransactions'
import Swal2 from 'sweetalert2'

export default class Checkout extends React.Component{
    state = {
        DataTransaction: null
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        let idTransaction = this.props.location.pathname.split('/')[2]

        console.log(idTransaction)
        Axios.get(linkTransactions + `/${idTransaction}`)
        .then((res) => {
            res.data.status === 'Paid'?
                Swal2.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Redirecting',
                    showConfirmButton: false,
                    timer: 500,
                    timerProgressBar: true,
                })
                .then((res) => {
                    window.location = "/"
                    this.setState({DataTransaction: null})
                })
                
            :
                this.setState({DataTransaction: res.data})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    payment = () => {
        let idTransaction = this.props.location.pathname.split('/')[2]

        let date = new Date()
        date = date.toString()

        let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]

        Axios.patch(linkTransactions + `/${idTransaction}`, {status: 'Paid', createdAt: newDate})
        .then((res) => {
            Swal2.fire({
                position: 'top',
                icon: 'success',
                title: 'Payment Success',
                confirmButtonText: `Go To Transaction History`
            })
            .then((res) => {
                Swal2.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Redirecting: Transaction History',
                    showConfirmButton: false,
                    timer: 500,
                    timerProgressBar: true,
                })
                .then((res) => {
                    window.location = "/transaction-history"
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.DataTransaction === null){
            return(
                null
            )
        }
        return(
            <div className="container text-light" style={{marginTop: '50px'}}>
                <h4>Checkout</h4>

                <div className="row">
                    <div className="col-7 mt-2">
                        <div className="card shadow px-4">
                            <div className="my-2">
                                <h5 className="card-title my-2 text-dark">
                                    Your Items:
                                </h5>
                                <div>
                                    <hr style={{borderWidth: '3px', width: '100%'}}/>
                                </div>
                                {
                                    this.state.DataTransaction.detail.map((value, index) => {
                                        return(
                                            <>
                                            <div className="row align-items-center text-dark">
                                                <div className="col-md-4" >
                                                    <img src={value.productImage} class="mw-100" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-uppercase cp-font-size-14 font-weight-normal">{value.productName}</h5>
                                                        <p className="card-text mt-n2"><small className="text-muted">
                                                            {value.productQuantity} barang ({value.productWeight} gr)
                                                        </small></p>
                                                        <p className="card-text font-weight-bold mt-n3">
                                                            Rp. {value.productPrice.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <hr style={{borderWidth: '1px'}}/>
                                            </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        <div className="col-12">
                            <div className="row text-dark">
                                <h6 className="col-6 font-weight-bold">
                                    Total Bayar
                                </h6>
                                <h6 className="font-weight-bold col-6 text-right">
                                    Rp. {this.state.DataTransaction.total.toLocaleString()}
                                </h6>
                            </div>
                        </div>
                        <div>
                            <hr style={{borderWidth: '3px', width: '100%'}}/>
                        </div>
                        </div>
                    </div>

                    <div className="col-5">

                        <div className="row mt-2">
                            <div className="col-12 shadow pt-3">
                                <h5>
                                    Alamat Pengiriman
                                </h5>
                                <hr style={{borderWidth: '3px', width: '100%'}}/>
                                <h6>
                                    Penerima:
                                </h6>
                                <p className="font-weight-bold">
                                    Patrick 
                                    <span className="font-weight-light mx-1">(Rumah)</span>
                                    <span className="badge badge-warning">Utama</span>
                                </p>
                                <p className="mt-n3 font-weight-light">
                                    +6281296917987
                                </p>
                                <p className="mt-n3 font-weight-lighter text-muted cp-font-size-14 width-200">
                                    Taman Palem Lestari G1 no 10, Cengkareng, Jakarta Barat, 11730
                                </p>
                            </div>

                            <div className="col-12">
                                <div className="mb-2 mt-3 shadow row">
                                    <div className="col-12">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col">
                                                <h5 className="card-title pt-3">
                                                    Metode Pembayaran
                                                </h5>
                                            </div>
                                            <div className="col pt-3 text-right">
                                                <button type="button" className="btn btn-success h-50" onClick={this.payment}>
                                                    Bayar Sekarang
                                                </button>
                                            </div>
                                        </div>
                                        <hr style={{borderWidth: '3px', width: '100%'}}/>
                                    </div>
                                    <div className="col-12">
                                        <div className="row my-3 pt-1 pb-2 border-bottom">
                                            <img className="col-3" height="25px" width="60px" src="" alt="" />
                                            <div className="col-9">
                                                <h6 className="card-subtitle">
                                                    Alfamart / Alfamidi / Lawson
                                                </h6>
                                                <p className="card-text">
                                                    Bisa di cabang mana saja
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row my-3 pt-1 pb-2 border-bottom">
                                            <img className="col-3" height="25px" width="60px" src="" alt="" />
                                            <div className="col-9">
                                                <h6 className="card-subtitle">
                                                    BCA Virtual Account
                                                </h6>
                                                <p className="card-text">
                                                    Layanan cepat, tersedia 25 jam
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row my-3 pt-1 pb-2 border-bottom">
                                            <img className="col-3" height="25px" width="60px" src="" alt="" />
                                            <div className="col-9">
                                                <h6 className="card-subtitle">
                                                    Kredit / Debit (Mastercard)
                                                </h6>
                                                <p className="card-text">
                                                    Bisa bayar penuh atau cicilan
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}