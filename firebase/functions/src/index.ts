import { initializeApp } from 'firebase-admin/app';
initializeApp();

// Exports das funções
export { enviarLembretes } from './functions/enviarLembretes';
export { importarPlanilhaGoogle } from './functions/importarPlanilhaGoogle';
