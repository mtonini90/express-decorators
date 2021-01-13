import {RouterConfig, Path} from './router';

export interface ControllerConfig {
	path: Path;
	middleware?: Array<any>;
}

export interface ControllerModel extends ControllerConfig {
	routes: RouterConfig[];
	routeMiddleware: Array<any>;
}
