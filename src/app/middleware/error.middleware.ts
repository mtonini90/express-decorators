export const errorHandler = (err: any, req: any, res: any, next: any) => {
	res.status(401).json(err.message);
};
