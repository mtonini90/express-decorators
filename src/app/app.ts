import {Express} from 'express';
import helmet from 'helmet';
import {authHandler, errorHandler} from './middleware/index';
import {Server, ExpressApp} from './core/decorators/index';
import {BeforeInit} from './core/models/index';

@Server({
	port: process.env.PORT || 8000,
	db_connect: process.env.DB_CONNECT as string,
	aut_key: process.env.SECRET_KEY as string,
})
export class App implements BeforeInit {
	@ExpressApp() app: Express;

	beforeInit() {
		this.app
			.use(helmet())
			//.use(authHandler)
			.use(errorHandler);
	}
}
