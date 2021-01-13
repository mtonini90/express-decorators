import {Path} from '../models/index';
import {ContainerKeys} from '../const/container-keys';

export function routerFactory(method: string, path: Path) {
	return (
		target: any,
		propertyKey: string,
		description: PropertyDescriptor,
	) => {
		const route = Reflect.getMetadata(ContainerKeys.ROUTER_KEY, target) || [];
		Reflect.defineMetadata(
			ContainerKeys.ROUTER_KEY,
			[
				...route,
				{
					path,
					method,
					fn: description.value,
				},
			],
			target,
		);
	};
}

export function Get(path: Path) {
	return routerFactory('get', path);
}

export function Post(path: Path) {
	return routerFactory('post', path);
}

export function Put(path: Path) {
	return routerFactory('put', path);
}

export function Patch(path: Path) {
	return routerFactory('patch', path);
}

export function Delete(path: Path) {
	return routerFactory('delete', path);
}
