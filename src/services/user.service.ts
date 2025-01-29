import { CreateRequestContext } from "@mikro-orm/core";
import { initORM } from "../db";
import { User } from "../entities/user.entity";
import { PasswordHasherInterface } from "../interfaces/password-hasher.interface";
import { UserRepository } from "../repositories/user.repository";
import { PasswordHasherService } from "./password-hasher.service";
import { AuthService } from "./auth.service";
import { RegisterDataInterface } from "../interfaces/register-data.interface";
import JwtService from "./jwt.service";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherInterface,
    private readonly jwtService: JwtService
  ) {}

  static async create() {
    const db = await initORM();

    const userRepository = db.em.getRepository(User);
    const passwordHasherService = new PasswordHasherService();
    const jwtService = new JwtService();

    const instance = new UserService(
      userRepository,
      passwordHasherService,
      jwtService
    );

    return instance;
  }

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async isEmailTaken(email: string): Promise<boolean> {
    const foundUser = await this.userRepository.findOne({ email });
    return foundUser !== null;
  }

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async createUser(data: RegisterDataInterface): Promise<User> {
    const hashedPassword = await this.passwordHasherService.hashPassword(
      data.password
    );

    const user = this.userRepository.create({
      ...data,
      hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const id = await this.userRepository.insert(user);
    user.id = id;

    return user;
  }

  public generateJwtToken(userId: number): string {
    return this.jwtService.generateToken({ id: userId });
  }

  public async checkIsPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await this.passwordHasherService.comparePasswords(
      password,
      hashedPassword
    );
  }
}
