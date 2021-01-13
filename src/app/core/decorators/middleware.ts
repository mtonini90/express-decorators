import {ContainerKeys} from '../const/container-keys';
import {Path} from '../models';

export function Middleware(router: {for: Path}) {
	const decorator: MethodDecorator = (target, propertyKey, description) => {
		const md = Reflect.getMetadata(ContainerKeys.MIDDLEWARE_KEY, target) || {};
		const collection = md[`${router.for}`] || [];
		Reflect.defineMetadata(
			ContainerKeys.MIDDLEWARE_KEY,
			{
				...md,
				[`${router.for}`]: [...collection, description.value],
			},
			target,
		);
	};
	return decorator;
}
