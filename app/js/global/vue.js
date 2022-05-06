// Vue 
const VueApp = Vue.createApp({ 
    data: function() {
        return { 
            test: 'heeeee' 
            ,dataObj: {}
            ,comments: []
            ,currentUser: {}
            ,sendAction: true // true for send, false for reply
            ,deletWarning: false
            
        }
    },
    mounted: function () {
        this.fetcher(); 
    },
    methods: {
        fetcher() {
            fetch('./app/js/data/data.json')
                .then((res) => res.json())
                .then((data) => {
                    this.dataObj = data;
                    this.comments = data.comments;
                    this.currentUser = data.currentUser;
                    // updat local storage: 
                    this.AddToLocal(data);
                })
                .catch((err) => console.log(err.message))
        },
        AddToLocal(data) {

            localStorage.setItem("dataJson",JSON.stringify(data));
                        
        },
        delAlert(key) { 
            this.deletWarning = true; 
        }
    }
}); 


