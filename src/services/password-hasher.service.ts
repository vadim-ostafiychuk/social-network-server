import { PasswordHasherInterface } from "../interfaces/password-hasher.interface";
import * as bcrypt from "bcrypt";

export class PasswordHasherService implements PasswordHasherInterface {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
