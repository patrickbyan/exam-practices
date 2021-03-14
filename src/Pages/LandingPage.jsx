import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from 'axios'
import linkProducts from '../Supports/Constants/linkProducts'


export default class FlashSale extends Component {
    state = {
        dataSale: null,
    }

    componentDidMount(){
        this.onGetData()
    }

    onGetData = () => {
        Axios.get(linkProducts + `?_sort=price&_order=asc&_limit=10`)
        .then((res) => {
            this.setState({dataSale: res.data})
        })

        .catch((err) => {
            console.log(err)
        })
    }

    seeDetail = (index) => {
        localStorage.setItem('idProduct', index)
        window.location = `/DetailProducts/${index}`
    }

    mapFlashSale = () => {
        return this.state.dataSale.map((value, index) => {
            return(
                <div key={index}>
                    <div className="card align-self-center m-3 card-radius text-dark border-light" style={{height: '300px'}} onClick={() => {this.seeDetail(value.id)}} >
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
                        <p className="card-text pb-5 pl-3 d-flex"><small className="text-muted">
                            {/* <FontAwesomeIcon icon={faWeightHanging} className="fa-lg mr-2 text-`warning`" style={{zIndex: '3'}} /> */}
                            Stock: {value.stock}
                        </small></p>
                    </div>
                </div>
            )
        })
    }

    render() {
        const SettingsDesktop = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            initialSlide: 0,
        }

        if(this.state.dataSale === null){
            return(
                <div className="container text-center mt-5 height-150 mb-5">
                    <div className="spinner-grow text-warning" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }    
        return (
            <div className="cp-bg-white d-md-block d-none">
                <div className="container pt-4 cp-bg-white">
                    <div className="text-center">
                        <h2 className="font-weight-bold">HARGA PALING MURAH</h2>
                    </div>
                    <Slider {...SettingsDesktop} className="bg-dark px-3 full-radius">
                        {
                            this.mapFlashSale()
                        }
                    </Slider>
                </div>
            </div>
        );
    }
}