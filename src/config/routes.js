import Home from '../views/Home.js'
import MovieIndex from '../views/MovieIndex.js'
import MovieShow from '../views/MovieShow.js'
import MovieCreate from '../views/MovieCreate.js'
import MovieUpdate from '../views/MovieUpdate.js'
import MovieDelete from '../views/MovieDelete.js'

const routes = [{
        view: Home,
        path: '/',
        linkText: 'Home'
    },
    {
        view: MovieIndex,
        path: '/movies',
        linkText: 'Show All'
    },
    {
        view: MovieShow,
        path: '/movie',
        linkText: 'Show One'
    },
    {
        view: MovieCreate,
        path: '/add-movie',
        linkText: 'Add'
    },
    {
        view: MovieUpdate,
        path: '/update-movie',
        linkText: 'Update'
    },
    {
        view: MovieDelete,
        path: '/delete-movie',
        linkText: 'Delete'
    },
]

export default routes