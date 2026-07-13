import { redirect } from 'next/navigation';
import { isAuthenticated } from '../actions/auth';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }

  return <HomeClient />;
}
