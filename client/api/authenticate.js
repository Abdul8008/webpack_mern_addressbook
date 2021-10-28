export default function homeApi(http) {
    return {
      login: data => {
        return http.post('/signin', data)
      },
      forgot: data => {
        return http.post('/createpos', data)
      },
      reset: data => {
        return http.post('/createpos', data)
      }
    }
  }
  