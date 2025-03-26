import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';

export const authGuard: CanActivateFn = (route, state) => {

  const sessionService = inject(SessionService);

  const router = inject(Router);

  const isAuthenticated= !!sessionService.getUserEmail();

  if(isAuthenticated){
    return true;
  }else{
      router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
  }
  
};
