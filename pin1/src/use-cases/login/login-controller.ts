import { Login } from "./login";
import { Request , Response } from "express";

export class LoginController {

  async login(req: Request, res: Response): Promise<Response> {
    try {
    const { email, secret } = req.body;
    const login = new Login(email, secret);
    const loginResponse = await login.execute({ email, secret });
    if(!loginResponse) return res.status(400).json({ message: "User not found" }
    );
    return res.json(loginResponse);
    }
    catch (err:any) {
      return res.status(400).json({ message: err.message });
    }
  }
  
}
