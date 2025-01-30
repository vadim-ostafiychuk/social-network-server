import { LoginResponse } from "../interfaces/login-response.interface";
import { RegisterDataInterface } from "../interfaces/register-data.interface";
import { GraphQLError } from "graphql";
import { UserService } from "./user.service";
import { UserMailService } from "./user-mail.service";

export class AuthService {
  static #instance: AuthService;

  private constructor(
    private readonly userService: UserService,
    private readonly userMailService: UserMailService
  ) {}

  static async create() {
    if (!AuthService.#instance) {
      const userService = await UserService.create();
      const userMailService = UserMailService.create();

      const instance = new AuthService(userService, userMailService);

      AuthService.#instance = instance;
    }

    return AuthService.#instance;
  }

  public async register(data: RegisterDataInterface): Promise<LoginResponse> {
    const emailTaken = await this.userService.isEmailTaken(data.email);
    if (emailTaken) {
      throw new GraphQLError(`Email "${data.email}" already exists.`);
    }

    const user = await this.userService.createUser(data);

    this.userMailService
      .sendRegistrationConfirmationEmail(user)
      .catch((err) => console.log(err));

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
