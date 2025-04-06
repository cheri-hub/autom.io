import { onRequest } from 'firebase-functions/v2/https';
import { importarDaPlanilha } from '../sheetsImporter';

export const importarPlanilhaGoogle = onRequest(async (req, res) => {
  try {
    await importarDaPlanilha();
    res.status(200).send('Importação concluída com sucesso.');
  } catch (err) {
    console.error('Erro ao importar planilha:', err);
    res.status(500).send('Erro ao importar planilha.');
  }
});
