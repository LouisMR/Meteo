import tpl from '../avecTemplateHtml'

export default tpl({
    template: 'meteo.html',
    data() {
        return {
            nomVille: [],
            temperature: [],
            resenti: [],
            description: [],
            representation: [],
            forceVent: [],
            directionVent: [],
            fuseauHoraire: [],
            pluie: [],
            neige: [],
            soleilLeve: [],
            soleilCoucher: [],
            a: true,
            b: false,
            error:""
        }
    },

    mounted() {
        let ville = this.$route.params.ville
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+ville+"&units=metric&lang=fr&APPID=979a3632430372cf6a59bb7fe880b721").then(resp => {
            resp.json().then(resultat => {
                this.temperature = Math.round(resultat.main.temp)
                this.resenti = Math.round(resultat.main.feels_like)
                this.description = resultat.weather[0].description
                this.representation ="http://openweathermap.org/img/wn/"+resultat.weather[0].icon+"@2x.png"
                this.forceVent = Math.round(resultat.wind.speed * 3.6)
                this.directionVent = resultat.wind.deg
                        if (this.directionVent == 360 ) {
                            this.directionVent = "N"
                        }
                        if (this.directionVent >= 45 ) {
                            this.directionVent = "NE"
                        }
                        if (this.directionVent == 90 ) {
                            this.directionVent = "E"
                        }
                        if (this.directionVent >= 180 ) {
                            this.directionVent = "SE"
                        }
                        if (this.directionVent == 180 ) {
                            this.directionVent = "S"
                        }
                        if (this.directionVent >= 270 ) {
                            this.directionVent = "SW"
                        }
                        if (this.directionVent == 270 ) {
                            this.directionVent == "W"
                        }
                        if (this.directionVent >= 360 ) {
                            this.directionVent = "NW"
                        }

                this.fuseauHoraire = resultat.timezone / 3600

                
                    if (resultat.rain != undefined) {
                        this.pluie = resultat.rain["1h"]
                    }
               
                    if (resultat.snow != undefined) {
                        this.neige = resultat.snow["1h"]
                    }

                let dateLevee = new Date(resultat.sys.sunrise * 1000)
                let heureLevee = dateLevee.getHours()
                let minuteLevee = dateLevee.getMinutes()
                    if(minuteLevee < 10 ) {
                        minuteLevee = "0" + minuteLevee
                    }
                this.dateLevee = heureLevee + ":" + minuteLevee

                let dateCoucher = new Date(resultat.sys.sunset * 1000)
                let heureCoucher = dateCoucher.getHours()
                let minuteCoucher = dateCoucher.getMinutes()
                if(minuteCoucher < 10 ) {
                    minuteCoucher = "0" + minuteCoucher
                }
                this.dateCoucher = heureCoucher + ":" + minuteCoucher

                this.soleilLeve = this.dateLevee
                this.soleilCoucher = this.dateCoucher
            })
        })
    },

})