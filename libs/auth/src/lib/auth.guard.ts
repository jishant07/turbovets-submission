import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly jwtService: JwtService
	){}
	
	async canActivate(
		context: ExecutionContext
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization?.split(' ')[1]; // Assuming Bearer token
		if (!token) {
			throw new UnauthorizedException('No authorization token provided.');
		}
		try {
			const decoded = await this.jwtService.verifyAsync(token)
			request.currentUser = decoded
			return true
		} catch (error) {
			throw new UnauthorizedException(JSON.stringify(error));
		}
	}
}
