import { Request, Response } from "express";
import { GeneratePix } from "./generate-pix";

export class GeneratePixController {
  private generatePix: GeneratePix;

  constructor() {
    this.generatePix = new GeneratePix();
  }

  async generate(req: Request, res: Response) {
    try {
      const pix = await this.generatePix.execute();
      return res.status(201).json({ pix });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}