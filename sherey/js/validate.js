

const validate = (field, fieldName) =>{
    if(field == ""){
     swal("Error!", `${fieldName} field should be filled`, "error")
        return false
    }
    return true
}

const validateNum = (field, fieldName) => {
    let bool
    switch(Math.sign(field)){
        case 1:
        bool = true
        break
        
        case -1:
        swal("Error!", `${fieldName} field should be positive number`, "error")
        bool = false
        break
        
        case 0:
        bool =  true
        break
        
        case -0:
        swal("Error!", `${fieldName} field should be positive number`, "error")
        bool = false
        break

        default:
        swal("Error!", `${fieldName} field should be number`, "error")
        bool = false
    }
    return bool
}