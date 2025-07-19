const axios = require('axios')

module.exports = async (req, res) => {
  try {
    const { url } = req.query

    if (!url || !url.includes('spotify.com/track/')) {
      return res.status(400).json({
        status: 400,
        message: 'Masukkan link Spotify track yang valid'
      })
    }

    const id = url.split('/track/')[1]?.split('?')[0]

    const fabRes = await axios.get(`https://api.fabdl.com/spotify/track/${id}`)
    const dlRes = await axios.get(`https://api.fabdl.com/spotify/download-mp3/${id}`)

    if (fabRes.data && dlRes.data.url) {
      return res.status(200).json({
        creator: 'DravinAPIs',
        status: 200,
        data: {
          title: fabRes.data.title,
          thumbnail: fabRes.data.thumbnail,
          url: dlRes.data.url,
          duration: fabRes.data.duration_ms,
          artists: fabRes.data.artists,
          release_date: fabRes.data.release_date
        }
      })
    } else {
      return res.status(404).json({
        status: 404,
        message: 'Track tidak ditemukan'
      })
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Terjadi kesalahan',
      error: err.message
    })
  }
}
