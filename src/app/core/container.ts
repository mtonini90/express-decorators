import {ContainerKeys} from './const/container-keys';
import {Ctor} from './models';

class Container {
	providers = new Map<string, Ctor>();

	registry<T>(type: Ctor<T>) {
		const provider = this.get<T>(type);
		if (!provider) {
			const paramtypes = Reflect.getMetadata('design:paramtypes', type);
			let props = [];
			if (paramtypes) {
				props = paramtypes.map((param: any) => this.registry(param));
			}
			const ctor = Reflect.construct(type, props);
			const key = this.key(type);
			this.providers.set(key, ctor);
			return ctor;
		}
	}

	get<T>(type: Ctor<T>): Ctor<T> | null {
		const key = this.key(type);
		const provider = this.providers.get(key);
		return provider || null;
	}

	key<T>(type: Ctor<T>): string {
		const key = Reflect.getMetadata(ContainerKeys.TOKEN_KEY, type);
		if (!key) {
			throw TypeError(`not token for ${type.name} remember to use decorator`);
		}
		return key;
	}
}

export default new Container();
