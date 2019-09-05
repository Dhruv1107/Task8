import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authenticateService: AuthenticateService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		if (this.authenticateService.isLogin) return true;
		return this.router.createUrlTree([ '/auth' ]);
	}
}
