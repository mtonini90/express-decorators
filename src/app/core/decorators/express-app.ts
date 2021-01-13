import {ContainerKeys} from '../const/container-keys';
import express from 'express';

export function ExpressApp() {
	return (target: any, propertyKey: string): any => {
		Reflect.defineMetadata(ContainerKeys.APP_KEY, propertyKey, target);
		Object.defineProperty(target, propertyKey, {
			get: function () {
				return express();
			},
			enumerable: true,
			configurable: true,
		});
	};
}
