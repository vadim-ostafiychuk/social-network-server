import { LoginDataInterface } from "../../../interfaces/login-data.interface";
import { LoginResponse } from "../../../interfaces/login-response.interface";
import { RegisterDataInterface } from "../../../interfaces/register-data.interface";
import { AuthService } from "../../../services/auth.service";
import { loginSchema, RegisterSchema } from "../../schemas/auth.schema";

export default class AuthResolverMethods {
    constructor(private readonly authService: AuthService) {}
    
     static async create() {
        const authService = await AuthService.create();

        const instance = new AuthResolverMethods(authService);
    
        return instance;
      }

      public async login(dto: LoginDataInterface): Promise<LoginResponse> {
        const { error } = loginSchema.validate(dto);

        if (error) {
          throw new Error(`Validation failed: ${error.message}`);
        }

        return {
          jwt: "safasf"
        }
      }

      public async register(dto: RegisterDataInterface): Promise<LoginResponse> {

        const { error } = RegisterSchema.validate(dto);

        if (error) {
          throw new Error(`Validation failed: ${error.message}`);
        }

        const register = await this.authService.register(dto);

        return register;
      }
} 