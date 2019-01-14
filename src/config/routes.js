import Home from '../views/Home.js'
import MovieBrowse from '../views/MovieBrowse.js'
import MovieCreate from '../views/MovieCreate.js'

const routes = [{
        view: Home,
        path: '/',
        linkText: 'Home'
    },
    {
        view: MovieBrowse,
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