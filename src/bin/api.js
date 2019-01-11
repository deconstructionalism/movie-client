import axios from 'axios'

const baseUrl = "http://localhost:4741" 

export const getMovies = () => axios.get(`${ baseUrl }/movies`)

export const getMovie = data => axios.get(`${ baseUrl }/movies/${ data.id }`)

export const createMovie = data => axios.post(`${ baseUrl }/movies/`, {
    movie: data
})

export const updateMovie = data => {
  const { id } = data.id
  delete data.id
  return axios.patch(`${ baseUrl }/movies/${ id }`, {
    movie: data
  })
}

export const deleteMovie = data => axios.delete(`${ baseUrl }/movies/${ data.id }`)