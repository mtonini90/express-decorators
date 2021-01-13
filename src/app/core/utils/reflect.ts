import {ContainerKeys} from '../const/container-keys';

export function setToken(target: any) {
	Reflect.defineMetadata(ContainerKeys.TOKEN_KEY, Symbol(), target);
}
