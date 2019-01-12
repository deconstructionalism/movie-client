import Home from '../views/Home.js'
import MovieIndex from '../views/MovieIndex.js'
import MovieCreate from '../views/MovieCreate.js'

const routes = [{
        view: Home,
        path: '/',
        linkText: 'Home'
    },
    {
        view: MovieIndex,
        path: '/movies',
        linkText: 'Browse'
    },
    {
        view: MovieCreate,
        path: '/add-movie',
        linkText: 'Add'
    }
]

export default routes