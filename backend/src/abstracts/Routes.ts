import { Application, Request, Response } from "express";

abstract class Routes {
  app: Application;

  constructor(app: Application) {
    this.app = app;
    this.configureRoutes();
  }

  abstract index(req: Request, res: Response): Promise<void>;
  abstract show(req: Request, res: Response): Promise<void>;
  abstract create(req: Request, res: Response): Promise<void>;
  abstract update(req: Request, res: Response): Promise<void>;
  abstract delete(req: Request, res: Response): Promise<void>;
  abstract getRouteName(): string;

  // Method to configure routes. This can be overridden in the derived class if needed.
  configureRoutes(): void {
    this.app.get(`/${this.getRouteName()}`, this.index);
    this.app.get(`/${this.getRouteName()}/:id`, this.show);
    this.app.post(`/${this.getRouteName()}`, this.create);
    this.app.put(`/${this.getRouteName()}/:id`, this.update);
    this.app.delete(`/${this.getRouteName()}/:id`, this.delete);
  }
}
