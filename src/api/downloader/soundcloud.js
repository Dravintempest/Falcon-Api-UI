/* 
• Scrape SoundCloud Downloader
• Author : SaaOfc's
*/

import axios from 'axios'

async function SoundCloud(trackUrl) {
  try {
    const response = await axios.post(
      'https://api.downloadsound.cloud/track',
      { url: trackUrl },
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://downloadsound.cloud/',
          'Origin': 'https://downloadsound.cloud/',
          'Content-Type': 'application/json',
        }
      }
    )

    const data = response.data

    const output = {
      url: data?.url || null,
      title: data?.title || null,
      author: {
        id: data?.author?.id,
        username: data?.author?.username,
        first_name: data?.author?.first_name,
        last_name: data?.author?.last_name,
        avatar_url: data?.author?.avatar_url,
        city: data?.author?.city,
        country_code: data?.author?.country_code,
        description: data?.author?.description,
        followers_count: data?.author?.followers_count,
        followings_count: data?.author?.followings_count,
        likes_count: data?.author?.likes_count,
        playlist_likes_count: data?.author?.playlist_likes_count,
        permalink_url: data?.author?.permalink_url,
        uri: data?.author?.uri,
        verified: data?.author?.verified,
        kind: data?.author?.kind,
        created_at: data?.author?.created_at,
        comments_count: data?.author?.comments_count
      },
      thumbnail: data?.imageURL
    }

    console.log(output)
    return output

  } catch (error) {
    console.error('emror:', error?.response?.status, error?.response?.data || error.message)
    return null
  }
}

// tes
SoundCloud('https://m.soundcloud.com/hoang-phuc-195492892/mu-a-ro-i-va-o-pho-ng-remix')
