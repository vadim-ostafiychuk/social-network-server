import jwt, { JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";

// Витягуємо секретний ключ і час дії токену з process.env
const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const EXPIRES_IN: StringValue = (process.env.JWT_EXPIRES_IN ||
  "1h") as StringValue;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be set in environment variables");
}

export class JwtService {
  private secretKey: string;
  private expiresIn: StringValue;

  constructor(
    secretKey: string = SECRET_KEY,
    expiresIn: StringValue = EXPIRES_IN
  ) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch {
      throw new Error("Invalid or expired token");
    }
  }

  decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}
