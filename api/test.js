export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKeyConfigured = !!process.env.ANTHROPIC_API_KEY;
  const apiKeyLength = process.env.ANTHROPIC_API_KEY?.length || 0;

  return res.status(200).json({
    status: 'API is working',
    apiKeyConfigured: apiKeyConfigured,
    apiKeyLength: apiKeyLength,
    timestamp: new Date().toISOString()
  });
}
