import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.GHL_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('GHL_CHAT_WEBHOOK_URL environment variable is not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!upstream.ok) {
      console.error('GHL chat webhook returned', upstream.status);
      return res.status(502).json({ error: 'Upstream error' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to forward chat lead:', err);
    return res.status(500).json({ error: 'Failed to forward chat lead' });
  }
}
