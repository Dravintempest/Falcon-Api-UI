module.exports = function(app) {
    const axios = require('axios');
    
    app.get('/download/youtube', async (req, res) => {
        const { url, quality } = req.query;
        
        if (!url) {
            return res.status(400).json({ 
                status: false, 
                error: 'YouTube URL is required' 
            });
        }

        try {
            // Validasi URL YouTube
            if (!url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
                return res.status(400).json({
                    status: false,
                    error: 'Invalid YouTube URL'
                });
            }

            // Konfigurasi request ke API ytmp4.fit
            const options = {
                method: 'GET',
                url: 'https://ytmp4.fit/api/convert',
                params: {
                    url: url,
                    q: quality || '720p' // Default quality 720p jika tidak ditentukan
                },
                headers: {
                    'Accept': 'application/json'
                }
            };

            const response = await axios.request(options);
            
            if (response.data.error) {
                return res.status(400).json({
                    status: false,
                    error: response.data.error
                });
            }

            // Format response
            const result = {
                title: response.data.title || 'No title',
                duration: response.data.duration || '00:00',
                quality: response.data.q || quality || '720p',
                size: response.data.size || '0 MB',
                thumbnail: response.data.thumb || '',
                downloadUrl: response.data.dlink || ''
            };

            res.status(200).json({
                status: true,
                result: result
            });

        } catch (error) {
            console.error('YouTube Download Error:', error);
            res.status(500).json({ 
                status: false, 
                error: error.response?.data?.error || error.message 
            });
        }
    });
}
