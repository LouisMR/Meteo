import tpl from '../avecTemplateHtml'

export default tpl({
    template: 'accueil.html',
    data: function() {
        return {
            accueil: "accueil!",
            meteo: ""
        }
    },
    mounted() {

    },

    methods: {
        ville(e) {
            e.preventDefault()
            this.$router.push({
                path: '/meteo/' + this.meteo
            })
        }
    }
    
})