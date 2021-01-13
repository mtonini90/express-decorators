import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authHandler = (req: any, res: any, next: any) => {
	const token = req.header('Authorization');
	if (!token) {
		return next({message: 'Auth token is not supplied'});
	}
	return jwt.verify(token.split(' ')[1], SECRET_KEY, (err: any, auth: any) => {
		console.log(err);
		if (err) {
			return next(err);
		}
		req.auth = auth;
		next();
	});
};

export const generateToken = (data: any): string => {
	const token = jwt.sign(data, SECRET_KEY, {expiresIn: '1h'});
	return token;
};
