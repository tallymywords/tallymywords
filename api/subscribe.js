export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests (including mobile app)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let email = '';
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        email = parsed.email || '';
      } catch {
        email = req.body;
      }
    } else if (req.body && typeof req.body === 'object') {
      email = req.body.email || '';
    }

    email = String(email).trim().toLowerCase();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Call Substack free subscription endpoint
    const substackUrl = 'https://tallymywords.substack.com/api/v1/free?nojs=true';
    const params = new URLSearchParams({
      email: email,
      source: 'embed'
    });

    const response = await fetch(substackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://tallymywords.substack.com/embed',
        'Origin': 'https://tallymywords.substack.com'
      },
      body: params.toString()
    });

    if (response.ok || response.status < 400) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing! Please check your email to confirm.'
      });
    }

    // Even if Substack responds with an unexpected code, log and provide friendly message
    const errorText = await response.text().catch(() => '');
    console.warn('Substack response status:', response.status, errorText.slice(0, 200));

    // Return success to the user so they are not blocked by internal Substack rate limits or duplicate warnings
    return res.status(200).json({
      success: true,
      message: 'Subscription received! Thank you for subscribing.'
    });
  } catch (error) {
    console.error('Substack subscription serverless error:', error);
    return res.status(500).json({
      error: 'Unable to connect to the subscription service. Please try again later.'
    });
  }
}
