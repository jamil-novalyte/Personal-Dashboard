import { BriefApp } from '@/components/brief-app';
import { fetchBrief } from '@/lib/api';

export default async function Home() {
  const brief = await fetchBrief();
  return <BriefApp initialBrief={brief} />;
}
