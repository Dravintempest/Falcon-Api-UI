const axios = require('axios')

async function fetchSpotifyInfo(spotifyUrl) {
  try {
    const id = spotifyUrl.split('/track/')[1]?.split('?')[0]

    // Ambil info lagu dari fabdl
    const fabRes = await axios.get(`https://api.fabdl.com/spotify/track/${id}`)
    const dlRes = await axios.get(`https://api.fabdl.com/spotify/download-mp3/${id}`)

    if (fabRes.data && dlRes.data.url) {
      return {
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
      }
    } else {
      return {
        status: 404,
        message: 'Track tidak ditemukan'
      }
    }

  } catch (err) {
    return {
      status: 500,
      message: 'Terjadi kesalahan',
      error: err.message
    }
  }
}

// Contoh penggunaan
const link = 'https://open.spotify.com/track/0WfDKnHOuN1xX8H9XrM6f0'
fetchSpotifyInfo(link).then(console.log)
