// server/server.ts
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Preview route for bots (WhatsApp, Facebook, etc.)
app.get('/preview/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 🧠 Replace with your real API
    const response = await fetch(`https://staging.hiroek.io/api/events/${id}`);
    const data: any = await response.json();

    const imageUrl = data?.data?.event?.photo;
    const title = data?.data?.event?.name ?? `Post ${id}`;
    const description = data?.data?.event?.description ?? 'Check out this post!';
    // const redirectUrl = `https://yourdomain.com/page/${id}`;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:type" content="website" /> 
          <meta name="twitter:card" content="summary_large_image" /> 
          <title>${title}</title>
        </head>
        <body>
          Redirecting to
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating preview.');
  }
});

// 🔁 Serve Vite static build
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
