import axios from 'axios'
export const URL_API = 'https://api.spotify.com/v1'

export const getToken = async () => {
  const requestConfig = {
    url: '/token',
    baseURL: 'https://accounts.spotify.com/api',
    method: 'post',
    data: `grant_type=client_credentials&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const data = await axios(requestConfig)

  window.localStorage.setItem('access_Token', data.data.access_token)
  return data.data.access_token
}
