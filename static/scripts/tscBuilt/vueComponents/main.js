const app = Vue.createApp({
    data() {
        return {
            cities: [],
            apiCallDelay: 60,
            rightTabModule: "form",
            graphCityId: Number
        };
    },
    methods: {
        unload() {
            this.rightTabModule = "none"; //by komponent mógł zostać załadowany od nowa
        },
        showGraph(cityId) {
            this.graphCityId = cityId;
            //this.rightTabModule = "form"; //by komponent mógł zostać załadowany od nowa
            //this.unload();
            //console.log(this.rightTabModule + this.graphCityId);
            this.rightTabModule = "graph";
            //console.log(this.rightTabModule + this.graphCityId);
        },
        newCityForm() {
            this.rightTabModule = "none";
            this.unload();
            this.rightTabModule = "form";
            //console.log(this.rightTabModule);
        }
    }
});
