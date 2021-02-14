import {Controller, Get, Middleware} from '../core/decorators/index';

@Controller({
	path: '/user',
})
export class UserController {
	@Get('/signin')
	signin(req: any, res: any) {
		res.send('signin');
	}

	@Get('/signup')
	signup(req: any, res: any) {
		res.send('signup');
	}

	@Middleware({for: '/signup'})
	middlewareSignup(req: any, res: any, next: any) {
		console.log('Middleware signup');
		next();
	}
}
