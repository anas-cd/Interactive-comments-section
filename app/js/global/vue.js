// Vue 
const VueApp = Vue.createApp({
    data: function() {
        return {
            test: 'heeeee'
            ,dataObj: {}
            ,comments: []
            ,currentUser: {}
            
        }
    },
    mounted: function () {
        this.fetcher()
        
    },
    methods: {
        fetcher() {
            fetch('./app/js/data/data.json')
            .then((res) => res.json())
            .then((data) => {
                this.dataObj = data;
                this.comments = data.comments;
                this.currentUser = data.currentUser;
                console.log(JSON.parse(JSON.stringify(this.currentUser.image.png)));
            })
            .catch((err) => console.log(err.message)) 
        }
    }
}); 
