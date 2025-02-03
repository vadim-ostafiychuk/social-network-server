import { CreateRequestContext, wrap } from "@mikro-orm/core";
import { initORM } from "../db";
import { User } from "../entities/user.entity";
import { PasswordHasherInterface } from "../interfaces/password-hasher.interface";
import { UserRepository } from "../repositories/user.repository";
import { PasswordHasherService } from "./password-hasher.service";
import { RegisterDataInterface } from "../interfaces/register-data.interface";
import { JwtService } from "./jwt.service";
import { getUserInterface } from "../interfaces/get-user.interface";
import { UpdateUserDataInterface } from "../interfaces/update-user-data.interface";

export class UserService {
  static #instance: UserService;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherInterface,
    private readonly jwtService: JwtService
  ) {}

  static async create() {
    if (!UserService.#instance) {
      const db = await initORM();

      const userRepository = db.em.getRepository(User);
      const passwordHasherService = new PasswordHasherService();
      const jwtService = new JwtService();

      const instance = new UserService(
        userRepository,
        passwordHasherService,
        jwtService
      );

      UserService.#instance = instance;
    }

    return UserService.#instance;
  }

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async getUser(data: getUserInterface): Promise<User | null> {
    return await this.userRepository.findOne({
      ...(data.id ? { id: data.id } : {}),
    });
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

  @CreateRequestContext<UserService>((t) => t.userRepository)
  public async updateUser(
    user: User,
    data: UpdateUserDataInterface
  ): Promise<User> {
    if (data.mainProfileImage || data.mainProfileImage === null) {
      wrap(user).assign({
        mainProfileImage: {
          id: data.mainProfileImage,
        },
      });
    }

    wrap(user).assign({
      updatedAt: new Date(),
    });

    const updatedUser = await this.userRepository.upsert(user);

    return updatedUser;
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
