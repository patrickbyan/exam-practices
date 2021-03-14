function ValidEmail(inputEmail){
    let splitEmail = inputEmail.split('@')
    let namaEmail = splitEmail[0]
    let hostingEmail = splitEmail[1]
    
    if(inputEmail && namaEmail && hostingEmail){
        if(namaEmail[0] >= 0) return 'kata depan gaboleh angka'

        if(namaEmail[0] === namaEmail[0].toUpperCase()) return 'kata depan gaboleh huruf kapital'

        for(let i = 0; i < inputEmail.length; i++){
            if(inputEmail[i] === ' ') return 'email tidak boleh berspasi'
        }

        let splitHostEmail = hostingEmail.split('.')
        if(splitHostEmail.length <= 1) return 'email harus berakhir dengan .com/.co.id'
        
        for(let i = 0; i < splitHostEmail.length; i++){
            if(splitHostEmail[i] === '' || splitHostEmail[i] === ' '){
                return 'email harus berakhir dengan .com / .co.id / .ac.id / gov.id / etc'
            }
        }

    }else{
        return 'valid email ex: user@gmail.com / user@gmail.co.id / user21@gmail.com / etc'
    }

    return true
}

export default ValidEmail

// harus ada @gmail / @yahoo / @student
// harus ada .com /.co.id / .atmajaya.ac.id

// patrick byan@gmail.com salah
// 21patrickbyan@gmail.com salah
