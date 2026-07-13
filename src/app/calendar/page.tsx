import { redirect } from 'next/navigation';
import { isAuthenticated } from '../actions/auth';
import CalendarClient from './CalendarClient';

export default async function CalendarPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }

  return <CalendarClient />;
}
