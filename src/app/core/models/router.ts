export type Path = string | RegExp;

export interface RouterConfig {
	method: string;
	path: Path;
	fn: () => {};
}
