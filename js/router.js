import accueil from './pages/accueil'
import meteo from './pages/Meteo'

Vue.component('accueil', accueil)

/**
 * Chaque route est défini par un object literal
 *  - La clé path représente l'url
 *  - La clé component doit être un object literal de component 
 *         Ce qui irait habituellement dans Vue.component('nom', _____)
 */
export default new VueRouter({
    routes: [
        { path: '/', component: accueil },
        { path: '/meteo/', component: accueil },
        { path: '/meteo/:ville', component: meteo }
    ]
})