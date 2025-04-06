import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';

const db = getFirestore();

const YOUR_PHONE_ID = '618839804644598';
const ACCESS_TOKEN = 'SEU_TOKEN';

export const enviarLembretes = onSchedule('every 60 minutes', async () => {
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const dataAlvo = amanha.toISOString().split('T')[0];

  try {
    const snapshot = await db.collection('agendamentos')
      .where('data', '==', dataAlvo)
      .where('notificado', '==', false)
      .get();

    const promises: Promise<any>[] = [];

    snapshot.forEach(doc => {
      const agendamento = doc.data();
      const msg = `Olá, ${agendamento.nome}! Lembramos que você tem uma consulta amanhã às ${agendamento.hora}.`;

      const payload = {
        messaging_product: "whatsapp",
        to: agendamento.telefone,
        type: "text",
        text: { body: msg }
      };

      const config = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      };

      const p = axios.post(`https://graph.facebook.com/v18.0/${YOUR_PHONE_ID}/messages`, payload, config)
        .then(() => doc.ref.update({ notificado: true }))
        .catch(err => {
          console.error(`Erro ao enviar para ${agendamento.telefone}:`, err.message);
        });

      promises.push(p);
    });

    await Promise.all(promises);
    console.log(`Lembretes enviados: ${promises.length}`);
  } catch (error) {
    console.error('Erro na função de lembrete:', error);
  }
});
