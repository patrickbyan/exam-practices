import react from 'react'
import axios from 'axios'
import Swal2 from 'sweetalert2'

import ValidEmail from '../Supports/Functions/ValidEmail'
import ValidPassword from '../Supports/Functions/ValidPassword'

import linkUsers from '../Supports/Constants/linkUsers'

export default class Register extends react.Component{
    state = {
        error: null,
        errorEmail: null,
        errorPassword: null,
        errorConfirmPassword: null
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
            this.onRegister()
        }
    }

    onRegister = () => {
        let inputEmail = this.refs.inputEmail.value
        let inputPassword = this.refs.inputPassword.value
        let inputConfirmPassword = this.refs.inputConfirmPassword.value

        let resultEmail = ValidEmail(inputEmail)
        this.setState({errorEmail: resultEmail})

        let resultPassword = ValidPassword(inputPassword)
        this.setState({errorPassword: resultPassword})

        let resultConfirmPassword
        if(inputPassword && inputConfirmPassword){
            if(inputPassword !== inputConfirmPassword){
                this.setState({errorConfirmPassword: 'confirm password harus sama dengan password'})
            }else{
                resultConfirmPassword = true
                this.setState({errorConfirmPassword: null})
            }
        }

        if(resultEmail === true && resultPassword === true && resultConfirmPassword === true){
            this.setState({error: 'You`re all set!'})
        }else{
            this.setState({error: null})
        }
    }

    onClickToRegister = () => {
        let inputEmail = this.refs.inputEmail.value
        let inputPassword = this.refs.inputPassword.value

        if(this.state.error !== null){
            axios.get(linkUsers + `?email=${inputEmail}`)
            .then((res) => {
                if(res.data.length !== 0){
                    this.setState({error: 'Email sudah terdaftar'})
                }else{
                    axios.post(linkUsers, {email: inputEmail, password: inputPassword})
                    .then((res) => {
                        // console.log(res)
                        window.location = '/'
                        localStorage.setItem('id', res.data.id)
                        // console.log(res.data.id)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
    render(){
        return(
            <div className="container">
                <form className="mt-5">
                    <div className="form-group row align-items-center">
                        <p className="col-4 col-form-label">Email</p>
                        <div className="col-4">
                            <input type="email" ref="inputEmail" className="form-control" id="inputEmail" onChange={this.onRegister}/>
                        </div>
                        <p className="col-4 col-form-label text-danger">
                            {
                                this.state.errorEmail?
                                    this.state.errorEmail
                                :
                                    null
                            }
                        </p>
                    </div>
                    <div className="form-group row">
                        <p className="col-4 col-form-label">Password</p>
                        <div className="col-4">
                            <input type="password" ref="inputPassword" className="form-control" id="inputPassword" onChange={this.onRegister}/>
                        </div>
                        <p className="col-4 col-form-label text-danger">
                            {
                                this.state.errorPassword?
                                    this.state.errorPassword
                                :
                                    null
                            }
                        </p>
                    </div>
                    <div className="form-group row">
                        <p className="col-4 col-form-label">Confirm Password</p>
                        <div className="col-4">
                            <input type="password" ref="inputConfirmPassword" className="form-control" id="inputConfirmPassword" onChange={this.onRegister}/>
                        </div>
                        <p className="col-4 col-form-label text-danger">
                            {
                                this.state.errorConfirmPassword?
                                    this.state.errorConfirmPassword
                                :
                                    null
                            }
                        </p>
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
                            <button type="button" className="btn btn-primary" onClick={this.onClickToRegister}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}