const app = Vue.createApp({
    data() {
        return {
            cities: [],
            apiCallDelay: 60 //aplikacja łączy się z API co 60 sekund
        }
    },

    methods: {
        showGraph(cityId: number) {
            console.log(cityId)
        }
    },

    computed: {
//        canAddMoreCities() {
//            return (this.cities.length < this.citiesMax)
//        }
    }
})