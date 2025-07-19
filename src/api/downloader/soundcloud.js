module.exports = function (app) {
  app.get('/downloader/soundcloud', async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ status: false, error: 'URL is required' });
    }

    try {
      const response = await fetch(`https://api.soundcloudrip.com/info?url=${encodeURIComponent(url)}`);
      const json = await response.json();

      if (!json.success) throw new Error(json.message || 'Failed to download');

      res.status(200).json({
        status: true,
        result: {
          title: json.title,
          author: json.author,
          thumbnail: json.thumbnail,
          streamUrl: json.download_url
        }
      });
    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
