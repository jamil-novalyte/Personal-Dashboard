import { BriefSnapshot } from './types';
import { mockSnapshot } from './mock-data';

export async function fetchBrief(): Promise<BriefSnapshot> {
  // BACKEND: Replace with fetch('/api/brief')
  return Promise.resolve(mockSnapshot);
}

export async function markActionDone(id: string): Promise<void> {
  // BACKEND: Replace with fetch('/api/actions/${id}', { method: 'PATCH' })
  console.log(`Action ${id} marked done`);
  return Promise.resolve();
}

export async function listClinics(): Promise<any[]> {
  // BACKEND: Replace with fetch('/api/clinics')
  return Promise.resolve(mockSnapshot.clinics);
}
