import {ContainerKeys} from '../const/container-keys';
import {ServerConfig} from '../models/index';
import {setToken} from '../utils/reflect';

export function Server(config: ServerConfig) {
	return (constructor: Function) => {
		setToken(constructor);
		Reflect.defineMetadata(
			ContainerKeys.SERVER_KEY,
			{...config},
			constructor.prototype,
		);
	};
}
