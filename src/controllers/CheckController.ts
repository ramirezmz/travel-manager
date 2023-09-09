import { Request, Response } from "express";

class CheckController {
  async healthCheck(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Check health ok' });
  }
}

export default new CheckController();