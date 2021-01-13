import {App} from './app';
import {UserController} from './controllers/index';
import {ModuelConfig} from './core/models';

export const AppModule: ModuelConfig = {
	controllers: [UserController],
	server: App,
};
