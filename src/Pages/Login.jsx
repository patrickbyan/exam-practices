import react from 'react'
import axios from 'axios'
import Swal2 from 'sweetalert2'

import linkUsers from '../Supports/Constants/linkUsers'

export default class Login extends react.Component{
    state = {
        err: null
    }

    componentDidMount(){
        if(localStorage.getItem('id')){
            Swal2.fire({
                position: 'top',
                icon: 'info',
                title: 'You must do log out first!',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            })
            .then((res) => {
                window.location = "/"
            })
        }else{
            this.onLogin()
        }
    }

    onLogin = () => {
        let inputEmail = this.refs.inputEmail.value
        let inputPassword = this.refs.inputPassword.value

        axios.get(linkUsers + `?email=${inputEmail}&password=${inputPassword}`)
        .then((res) => {
            if(res.data.length === 1){
                Swal2.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Login Success!',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                })
                .then((res) => {
                    this.setState({err: null})
                    window.location = '/'
                })
                localStorage.setItem('id', res.data[0].id)
            }else{
                this.setState({err: 'email/password anda salah, silahkan periksa kembali'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="container">
                <form className="mt-5">
                    <div className="form-group row align-items-center">
                        <p className="col-4 col-form-label">Email</p>
                        <div className="col-4">
                            <input type="email" ref="inputEmail" className="form-control" id="inputEmail"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <p className="col-4 col-form-label">Password</p>
                        <div className="col-4">
                            <input type="password" ref="inputPassword" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <p className="col-12 col-form-label text-danger">
                            {
                                this.state.error?
                                    this.state.error
                                :
                                    null
                            }
                        </p>
                    </div>
                    <div className="form-group row">
                        <div className="col-9">
                            <button type="button" className="btn btn-primary" onClick={this.onLogin}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}