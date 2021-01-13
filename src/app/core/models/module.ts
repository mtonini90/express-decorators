export interface Ctor<T = any> {
	new (...args: any[]): T;
}

export interface ModuelConfig {
	controllers: Array<Ctor>;
	server: Ctor;
}
