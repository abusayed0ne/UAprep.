import type { EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null;
  const code = request.nextUrl.searchParams.get('code');
  const supabase = await createClient();
  let error: Error | null = null;
  if (tokenHash && type) {
    ({ error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type }));
  } else if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else {
    error = new Error('Missing confirmation token');
  }
  const destination = request.nextUrl.clone();
  destination.search = '';
  destination.pathname = error ? '/auth/error' : '/account';
  return NextResponse.redirect(destination);
}
