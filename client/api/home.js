export default function homeApi(http) {
    return {
      allPost: () => {
        return http.get('/allposts')
      },
      individualPost: () => {
        return http.get('/mypost')
      },
      createPost: data => {
        return http.post('/createpost', data)
      },
      updatePost: data => {
        return http.put('/updatepost', data)
      },
      deletePost: id => {
        return http.delete(`/deletepost/${id}`)
      },
    }
  }
  