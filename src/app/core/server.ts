import {Express, Router} from 'express';
import mongoose from 'mongoose';
import {ContainerKeys} from './const/container-keys';
import {
	ControllerModel,
	Ctor,
	ModuelConfig,
	RouterConfig,
	ServerConfig,
} from './models';
import Container from './container';

export class Server {
	private static _config: ServerConfig;
	private static _app: Express;

	static async connectDB() {
		mongoose.set('useFindAndModify', false);
		await mongoose.connect(this._config.db_connect as string, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
	}

	static listen() {
		this._app.listen(this._config.port, () => {
			console.log(`App listening at http://localhost:${this._config.port}`);
		});
	}

	static initControllers(controllers: Ctor[]) {
		controllers.forEach((controller) => {
			const c = Container.registry(controller);
			if (c) {
				const {path, middleware, routes, routeMiddleware} = Reflect.getMetadata(
					ContainerKeys.CONTROLLE_KEY,
					c,
				) as ControllerModel;
				const router = Router();
				this.initRoutes(routes, router, routeMiddleware || {});
				this._app.use(path, ...(middleware || []), router);
			}
		});
	}

	static initRoutes(routes: RouterConfig[], router: any, middleware: any) {
		routes.forEach((route: RouterConfig) =>
			(router as any)[route.method](
				route.path,
				...(middleware[`${route.path}`] || []),
				route.fn,
			),
		);
	}

	static config(ctor: any) {
		const appKey: string = Reflect.getMetadata(ContainerKeys.APP_KEY, ctor);
		this._config = Reflect.getMetadata(ContainerKeys.SERVER_KEY, ctor);
		this._app = ctor[appKey];
	}

	static async bootstrap(obj: ModuelConfig) {
		const {server, controllers} = obj;
		const s: any = Container.registry(server); // TODO tipizzare
		this.config(s);

		s.beforeInit();
		this.initControllers(controllers);
		await this.connectDB();
		this.listen();
	}
}
