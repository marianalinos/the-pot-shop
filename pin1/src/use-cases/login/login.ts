// import { LoginDTO } from "./login-dto";
import { UserRepository } from "../../repositories/user-repository";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaClient } from "@prisma/client";

export interface LoginRequest {
  email: string;
  secret: string;
}

export interface LoginResponse {
  token: string;
}

export class Login {
  private email: string;
  private secretKey: string;
  private userRepository: UserRepository ;

  constructor(email : string, secretKey: string) {
    this.email = email;
    this.secretKey = secretKey;
    this.userRepository = new PrismaUserRepository(new PrismaClient());
  }

  async execute({ email, secret }: LoginRequest): Promise<LoginResponse> {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
  
      const match = crypto.createHash('md5').update(secret).digest('hex') === user.getSecret();

      if (!match) {
        throw new Error("Wrong password");
      }
      const token = jwt.sign({ email: user.getEmail() }, this.secretKey);
      console.log(token , " - token" , user.getEmail(), " - email", user.getSecret(), " - secret"); 
      return { token };
    }
    
   public isValido(token: string): boolean {
    if(!token) {
      return false;
    }
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return !!decoded;
    }
    catch(err) {
      return false;
    }
   }

}
