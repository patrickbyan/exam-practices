function ValidPassword(inputPassword){
    if(inputPassword.length <= 8) return 'jumlah karakter password harus lebih dari 8'
    
    return true
}

export default ValidPassword