import { LoginResponse } from "../interfaces/login-response.interface";
import { RegisterDataInterface } from "../interfaces/register-data.interface";
import { GraphQLError } from "graphql";
import { UserService } from "./user.service";
import JwtService from "./jwt.service";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  static async create() {
    const userService = await UserService.create();

    const instance = new AuthService(userService);

    return instance;
  }

  public async register(data: RegisterDataInterface): Promise<LoginResponse> {
    const emailTaken = await this.userService.isEmailTaken(data.email);
    if (emailTaken) {
      throw new GraphQLError(`Email "${data.email}" already exists.`);
    }

    const user = await this.userService.createUser(data);

    const jwt = this.userService.generateJwtToken(user.id);

    return {
      jwt,
    };
  }
  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new GraphQLError(`Invalid email or password.`);
    }

    const isPasswordValid = await this.userService.checkIsPasswordValid(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      throw new GraphQLError(`Invalid email or password.`);
    }

    const jwt = this.userService.generateJwtToken(user.id);

    return {
      jwt,
    };
  }
}
