module.exports = function(app) {
    const axios = require('axios');
    
    // SoundCloud Downloader
    app.get('/downloader/soundcloud', async (req, res) => {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ 
                status: false, 
                error: 'SoundCloud URL is required' 
            });
        }

        try {
            // Basic SoundCloud URL validation
            if (!url.includes('soundcloud.com')) {
                return res.status(400).json({
                    status: false,
                    error: 'Invalid SoundCloud URL'
                });
            }

            // Request to downloadsound.cloud API
            const response = await axios.get(`https://downloadsound.cloud/api/download`, {
                params: { url }
            });
            
            if (response.data.error) {
                return res.status(400).json({
                    status: false,
                    error: response.data.error
                });
            }

            // Simplified response format
            res.status(200).json({
                status: true,
                result: {
                    title: response.data.title || 'Untitled',
                    artist: response.data.artist || 'Unknown',
                    duration: response.data.duration || 0,
                    downloadUrl: response.data.downloadUrl,
                    thumbnail: response.data.thumbnail || ''
                }
            });

        } catch (error) {
            console.error('SoundCloud Download Error:', error);
            res.status(500).json({ 
                status: false, 
                error: 'Failed to process SoundCloud download' 
            });
        }
    });
}
