import {Controller, Get, Middleware} from '../core/decorators/index';

@Controller({
	path: '/user',
})
export class UserController {
	@Get('/')
	prova(req: any, res: any) {
		res.send('testo di user');
	}

	@Get('/user2')
	prova2(req: any, res: any) {
		res.send('testo di user 2');
	}

	@Middleware({for: '/user2'})
	u3(req: any, res: any, next: any) {
		console.log('Middleware user2');
		next();
	}
}
