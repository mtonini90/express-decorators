import {setToken} from '../utils/reflect';

export function Injectable() {
	return (constructor: new () => any) => {
		setToken(constructor);
	};
}
