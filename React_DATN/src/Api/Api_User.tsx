import axios from "axios"

const instanceUser=axios.create({
    baseURL:`http://localhost:8080/api/`
})

export const Signup=(data:any)=>{
    return instanceUser.post(`signup`,data);
}
export const Signin=(data:any)=>{
    return instanceUser.post(`signin`,data);
}
export const VerifyCode=(data:any)=>{
    return instanceUser.post(`verification-codes`,data);
}
export const ForgotPassword=(data:any)=>{
    return instanceUser.post(`forgot-password`,data);
}
export const ChangePassword=(data:any)=>{
    return instanceUser.post(`change-password`,data);
}
export const GetAllUser=()=>{
    return instanceUser.get(`allUser`);
}
export const GetOneUser=(idUser:any)=>{
    return instanceUser.get(`oneUser/${idUser}`);
}