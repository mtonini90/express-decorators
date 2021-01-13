import {ContainerKeys} from '../const/container-keys';
import {ControllerConfig} from '../models/index';
import {setToken} from '../utils/reflect';

export function Controller({path, middleware}: ControllerConfig) {
	return (constructor: Function) => {
		const proto = constructor.prototype;
		setToken(constructor);
		const routes = Reflect.getMetadata(ContainerKeys.ROUTER_KEY, proto);
		const routeMiddleware = Reflect.getMetadata(
			ContainerKeys.MIDDLEWARE_KEY,
			proto,
		);
		Reflect.defineMetadata(
			ContainerKeys.CONTROLLE_KEY,
			{
				path,
				middleware,
				routes,
				routeMiddleware,
			},
			proto,
		);
	};
}
