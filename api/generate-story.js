export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are writing practice stories for the UIL (University Interscholastic League) Headline Writing contest in Texas. Generate SIX different news stories. Each story will have a different headline assignment, just like a real UIL contest.

CRITICAL FORMAT REQUIREMENTS (based on real UIL tests):
- All stories are for the "Leaguetown Press," the student newspaper of Leaguetown High School
- Each story should be 120-200 words (shorter than a full article — UIL stories are concise)
- Include 1-3 direct quotes from named sources (students, teachers, administrators, community members) with first AND last names plus their title/grade
- The LEAD (first 1-2 sentences) must contain the main news — this is what headlines should capture
- Later sentences add detail, quotes, and context
- Use realistic high school journalism tone — factual, not flowery
- Include specific details: dates, numbers, dollar amounts, locations, names
- Stories should feel like they belong in a real Texas high school newspaper

IMPORTANT: Each of the 6 stories MUST be about a DIFFERENT topic. Pick 6 different topics from this list:
- New school programs/classes (AI class, culinary program, automotive tech, chamber orchestra)
- Student clubs and organizations (politics club, grief club, garden club, creative writing club)
- Community service projects (food drives, cheer clinics for charity, free lunches for summer)
- Competitions and achievements (Science Olympics, film festival, baking contest, fencing championship)
- School events (prom theme voting, pickle fair, open mic night, food truck festival, taste testing)
- Policy changes (cell phone policy, dress code, attendance incentives, longer school day, bus route cuts)
- Fundraisers (Country Gala, yoga classes for trip money, project graduation)
- Donations and partnerships (solar panels, auto parts donation, bird-safe windows)
- Unique human interest stories (superintendent skydiving bet, student DJ, counselor wins pie contest)
- School improvements (new facilities, technology upgrades, garden projects, composting)
- Sports (team making playoffs, new coach hired, athlete signs with college, record-breaking season)
- Arts/Music (theater production, band competition, art show, choir wins state)

DO NOT use generic stories. Make each story unique, specific, and interesting — the kind of stories that would appear in a real UIL contest.

Format the response as JSON with exactly 6 stories:
{
  "stories": [
    "Story 1 full text here...",
    "Story 2 full text here...",
    "Story 3 full text here...",
    "Story 4 full text here...",
    "Story 5 full text here...",
    "Story 6 full text here..."
  ]
}`
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API request failed' });
    }

    const content = data.content.find(item => item.type === 'text')?.text || '';

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const storyData = JSON.parse(jsonMatch[0]);
      // Validate we got 6 stories
      if (storyData.stories && Array.isArray(storyData.stories) && storyData.stories.length === 6) {
        return res.status(200).json(storyData);
      } else {
        return res.status(500).json({ error: 'Expected 6 stories but got ' + (storyData.stories ? storyData.stories.length : 0) });
      }
    } else {
      return res.status(500).json({ error: 'Failed to parse stories' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
