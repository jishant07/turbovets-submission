import { jwtDecode } from 'jwt-decode'

export class JWTDecodeService {

    decodeJWT() {
        const token = localStorage.getItem('token')
        if(token){
            return jwtDecode(token)
        }
        return false
    }
}