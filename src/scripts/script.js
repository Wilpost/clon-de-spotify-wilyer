import axios from 'axios'
// import { useNavigation } from 'react-router'

export function useViewTransitionApi() {
  // const { location } = useNavigation()

  window.navigation.addEventListener('navigate', (e) => {
    const url = new URL(e.destination.url)

    if (window.location.origin !== url.origin) return
    console.log(url)

    e.intercept({
      async handler() {
        const res = await fetch(url.pathname)
        const data = await res.text()

        const [, text] = data.match(/<body>([\s\S]*)<\/body>/i)
        console.log(text)

        document.startViewTransition(() => {
          // el scroll hacia arriba del todo
          document.getElementById('root').innerHTML = text
          document.documentElement.scrollTop = 0
        })
      }
    })
  })
}

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
  console.log(data.data)

  window.localStorage.setItem('access_Token', data.data.access_token)
  return data.data.access_token
}
