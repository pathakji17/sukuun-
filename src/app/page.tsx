import { redirect } from 'next/navigation';
import { isAuthenticated } from './actions/auth';

export default async function RootPage() {
  const authed = await isAuthenticated();

  if (authed) {
    redirect('/home');
  } else {
    redirect('/login');
  }
}
