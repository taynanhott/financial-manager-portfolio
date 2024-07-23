import AuthService from '@/modules/auth/services/auth-service';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  AuthService.destroySession();

  return NextResponse.redirect(new URL('/portal/sign-in', req.url));
}
