import { LoginResponse } from "../interfaces/login-response.interface";
import { RegisterDataInterface } from "../interfaces/register-data.interface";

export class AuthService {
    constructor() {}

    static async create() {
        const instance = new AuthService();
    
        return instance;
    }

    public async register(data: RegisterDataInterface): Promise<LoginResponse> {
        console.log(data);


        return {
            jwt: "gsdgsdg",
        }
    }
}