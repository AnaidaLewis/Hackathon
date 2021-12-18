const Validation = (value) => {
    console.log(value);
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const numberRegex=/^[0-9]+$/
    let errors={};

    // Full name
    if(!value.name ){
        errors.name="Name is required"
    }
    else{
        errors.name=''
    }

    // email
    if(!value.email){
       errors.email="Email is required"
    }else if(!emailRegex.test(value.email)){
       errors.email='Email is invalid'
    }
    else{
        errors.email=''
    }

    // pw
    if(!value.password){
        errors.password="Password is required"
    }else if(value.password.length<8){
        errors.password="Password is too short"
    }else if(!passwordRegex.test(value.password)){
       errors.password="Password is not strong enough"
    }
    else{
        errors.password=''
    }

    // confirm pw
    if(!value.Cpassword){
        errors.Cpassword="Password is required"
    }else if(value.Cpassword!==value.password){
        errors.Cpassword="Password doesn't match"
    }
    else{
        errors.Cpassword=''
    }

    // first Name
    if(!value.fname ){
        errors.firstName="First name is required"
    }
    else{
        errors.fname=''
    }

    // last Name
    if(!value.lname ){
        errors.lastName="Last name is required"
    }
    else{
        errors.lname=''
    }

    // // phone Number
    // if(value.phoneNumber.length===0){
    //     errors.phoneNumber=""
    // }else if(!numberRegex.test(value.phoneNumber)){
    //     errors.phoneNumber="Invalid Phone Number"
    // }else if(value.phoneNumber.length!==10){
    //     errors.phoneNumber="Invalid Phone Number"
    // }

    // age
    // console.log(value.birthday);
    // if(value.birthday<=18 ){
    //     errors.age='Invalid age'
    // }
    // else{
    //     errors.age=''
    // }
    return errors
        
};

export default Validation
// Minimum eight characters, at least one letter, one number and one special character are required
