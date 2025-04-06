import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

const SERVICE_ACCOUNT_FILE = path.resolve(__dirname, '../chaves/service-account.json');
const SHEET_ID = 'SEU_ID_DA_PLANILHA'; // Substitua pelo ID real
const RANGE = 'A2:D';

export async function importarDaPlanilha(): Promise<void> {
  // Cria o client como JWT explicitamente tipado
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = (await auth.getClient()) as JWT; // 👈 Aqui está o segredo

  const sheets: sheets_v4.Sheets = google.sheets({ version: 'v4' });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
    auth: authClient,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.log('Nenhum dado encontrado na planilha.');
    return;
  }

  const db = getFirestore();
  const batch = db.batch();

  rows.forEach((row, index) => {
    const [nome, telefone, data, hora] = row;
    if (!nome || !telefone || !data || !hora) {
      console.warn(`Linha ${index + 2} ignorada por dados incompletos.`);
      return;
    }

    const docRef = db.collection('agendamentos').doc();
    batch.set(docRef, {
      nome,
      telefone,
      data,
      hora,
      notificado: false,
    });
  });

  await batch.commit();
  console.log(`Importados ${rows.length} agendamentos com sucesso.`);
}
