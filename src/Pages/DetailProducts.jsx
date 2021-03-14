import axios from 'axios'
import react from 'react'
import linkProducts from '../Supports/Constants/linkProducts'
import linkCarts from '../Supports/Constants/linkCarts'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal2 from 'sweetalert2'

export default class DetailProducts extends react.Component{
    state = {
        dataDetailProduct: null,
        mainImage: null,
        id: null,
        onlyCategory: null,
        thisCategory: null,
        thisProduct: null,
    }

    componentDidMount(){
        this.isUserLogin()
        this.onGetData()
    }

    isUserLogin = () => {
        let id = localStorage.getItem('id')

        if(id){
            this.setState({id: id})
        }
    }

    onGetData = () => {
        let idProduct = localStorage.getItem('idProduct')
        if(idProduct){
            axios.get(linkProducts + `/${idProduct}`)
            .then((res) => {
                this.setState({dataDetailProduct: res.data})
                this.setState({mainImage: res.data.image1})
                this.setState({thisCategory: res.data.category})
                this.onGetCategory()
            })
            .catch((err) => {
                console.log(err)
            })
        
        }
    }

    onGetCategory = () => {
        let idProduct = localStorage.getItem('idProduct')
        let thisCategory = this.state.thisCategory
        if(idProduct){
            axios.get(linkProducts + `?category=${thisCategory}`)
            .then((res) => {
                this.setState({onlyCategory: res.data})
                // console.log(this.state.onlyCategory)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    mapCat = () => {
        return this.state.onlyCategory.map((value, index) => {
            return(
                <div key={index}>
                    <div className="card align-self-center m-3 card-radius text-dark border-light" style={{height: '250px'}} onClick={() => {this.seeDetail(value.id)}} >
                            <div className="container pt-4" style={{zIndex: '3'}}>
                                <div className="bg-dark text-light w-25 text-center ml-n2">
                                    {index + 1}
                                </div>
                            </div>
                            <img src={value.image1} className="card-img-top width-250 height-120 mt-n5 pt-3 pl-4 pr-4" alt="..." />
                        <div className="card-body">
                            <h6 className="card-title h6 cp-dark-grey h-50 mt-n2" key={index}>{value.name}</h6>
                            {/* <p className="card-text font-weight-lighter cp-font-size-14 mt-3"><del>Rp {(value.price).toLocaleString()}</del></p> */}
                            <p className="card-text font-weight-normal mt-n2">Rp {value.price.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    seeDetail = (index) => {
        localStorage.setItem('idProduct', index)
        window.location = `/DetailProducts/${index}`
    }

    errorCart = () => {
        Swal2.fire({
            position: 'top',
            icon: 'error',
            title: 'Anda Harus Login Terlebih Dahulu',
            confirmButtonText: `Login`
        })
        .then((res) => {
            Swal2.fire({
                position: 'top',
                icon: 'info',
                title: 'Redirecting: Login Page',
                showConfirmButton: false,
                timer: 500,
                timerProgressBar: true,
            })
            .then((res) => {
                window.location = "/Login"
            })
        })
    }

    addToCart = () => {
        let idProduct = this.props.location.pathname.split('/')[2]
        let idUser = localStorage.getItem('id')
        let quantity = 1
        var totalQuantity = 0

        Swal2.fire({
            position: 'top',
            icon: 'success',
            title: 'Add to Cart Success',
            showConfirmButton: false,
            timer: 800,
            timerProgressBar: true,
        })

        .then((res) => {
            axios.get(linkCarts + `?idProduct=${idProduct}`)
            .then((res) => {
                console.log(res.data)
                if(res.data.length === 0){
                    axios.post(linkCarts, {idProduct: idProduct, idUser: idUser, quantity: quantity})
                    .then((res) => {
                        var totalQuantity = Number(localStorage.getItem('TQ'))
                        totalQuantity += res.data.quantity
                        localStorage.setItem('TQ', totalQuantity)
                        window.location = `/DetailProducts/${idProduct}`
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }else{
                    let qDB = res.data[0].quantity

                    axios.patch(linkCarts + `/${res.data[0].id}`, {quantity: qDB + 1})
                    .then((res) => {
                        axios.get(linkCarts)
                        .then((res) => { 
                            for(let i = 0; i < res.data.length; i++){
                                totalQuantity += res.data[i].quantity
                                localStorage.setItem('TQ', totalQuantity)
                            }
                            window.location = `/DetailProducts/${idProduct}`
                        })
                        .catch((err) => {

                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })

            .catch((err) => {
                console.log(err)
            })
        })
    }

    render(){
        const SettingsDesktop = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            initialSlide: 0,
        }

        if(this.state.dataDetailProduct === null || this.state.onlyCategory === null){
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
            <div className="container-md">
                <div className="row justify-content-center pt-5 pb-5 ">
                    <div className="col-12 col-md-6 pt-1">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <img src={this.state.mainImage} className="img-fluid" alt="..." />
                            </div>
                            <div className="col 3 mt-4">
                                <img src={this.state.dataDetailProduct.image1} className={this.state.mainImage === this.state.dataDetailProduct.image1? 'img-fluid border border-warning' : 'img-fluid'} alt="..." onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image1})} />
                            </div>
                            <div className="col 3 mt-4">
                                <img src={this.state.dataDetailProduct.image2} className={this.state.mainImage === this.state.dataDetailProduct.image2? 'img-fluid border border-warning' : 'img-fluid'} alt="..." onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image2})} />
                            </div>
                            <div className="col 3 mt-4">
                                {
                                    // this.state.dataDetailProduct.image3?
                                        <img src={this.state.dataDetailProduct.image3} className={this.state.mainImage === this.state.dataDetailProduct.image3? 'img-fluid border border-warning' : 'img-fluid'} alt="" onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image3})} /> 
                                    // : 
                                        // <img src={logo} className={this.state.mainImage === this.state.dataDetailProduct.image3? 'img-fluid border border-warning' : 'img-fluid'} alt="" onClick={() => this.setState({mainImage: logo})} /> 
                                } 
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="">
                            <h4>{this.state.dataDetailProduct.name}</h4>
                            <h6 className="font-weight-normal">
                                {
                                    this.state.dataDetailProduct.stock <= 3?
                                        <p className="text-danger">Produk Hampir Habis!</p>
                                    :
                                        null
                                }
                            </h6>
                            <h5>Rp. {(this.state.dataDetailProduct.price).toLocaleString()}</h5>
                            <hr className="border-dark hr-style"/>
                            <h6 className="font-weight-normal text-muted">Stock : {this.state.dataDetailProduct.stock} Item</h6>
                            <h6 className="font-weight-normal text-muted">Weight : {(this.state.dataDetailProduct.weight)/1000} kg</h6>
                            <hr className="border-dark hr-style"/>
                            <h6>Description :</h6>
                            <p className="text-wrap col-7 p-0 m-0 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel repudiandae, hic dolorum maiores dolor illum</p>
                            <div className="width-300 row align-items-center ml-1 mt-4">
                                {
                                    this.state.id?
                                        <div className="cp-clickable-element" onClick={this.addToCart}>
                                            <div className="w-100 col-12 btn btn-warning">Add to Cart</div>
                                        </div>
                                    :
                                    <div className="cp-clickable-element" onClick={this.errorCart}>
                                        <div className="w-100 col-12 btn btn-warning">Add to Cart</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-4 cp-bg-white">
                    <div className="text-center">
                        <h2 className="font-weight-bold">Produk Serupa</h2>
                    </div>
                    <Slider {...SettingsDesktop} className="bg-dark px-3 full-radius">
                        {
                            this.mapCat()
                        }
                    </Slider>
                </div>
            </div>
        )
    }
}