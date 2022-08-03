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
            ,idCounter: 4 // since we're starting with four total comments
            
        }
    },
    mounted: function () {
        this.fetcher(); 
    },
    methods: {
        fetcher() {
            if (localStorage.getItem("dataJson") === null) { 
                fetch('./app/js/data/data.json')
                .then((res) => res.json())
                .then((data) => {
                    this.dataObj = data;
                    this.comments = data.comments; 
                    this.currentUser = data.currentUser;
                    // updat local storage:
                    this.updateLocal(data);
                })
                .catch((err) => console.log(err.message));
            } else {
                console.log("getting data from local storage ...");
                let data = JSON.parse(localStorage.getItem("dataJson"));
                this.dataObj = data;
                this.comments = data.comments;
                this.currentUser = data.currentUser; 
            }
        },
        updateLocal(data) {
            localStorage.setItem("dataJson",JSON.stringify(data));
        },
        delAlert(key) { 
            this.deletWarning = true;
        },
        scoreUpdater(id,score) {
            
            let data = JSON.parse(localStorage.getItem("dataJson"));
            this.alter(data,'id', id, 'score', score);
            // if (data.comments.find(x => x.id === id)) {
            //     data.comments.find(x => x.id === id).score = score;
            //     this.updateLocal(data);
            // } else {

            //     this.alter(data,'id', id, 'score', score);
            // } 
        },
        textUpdater(id,message) {
            let data = JSON.parse(localStorage.getItem("dataJson"));
            this.alter(data,'id',id,'content',message)
        },
        addThread(message) {
            let data = JSON.parse(localStorage.getItem("dataJson"));

            let newThread = {
                id: ++this.idCounter,
                content: message,
                score: 0,
                user: this.currentUser,
                replies: []
            }
            
            data.comments.push(newThread);
            this.updateLocal(data);
        },
        alter(dataObj,iden,idenValue,surg,surgValue) {
            
            for(index in dataObj) {
            
                if (index == iden && dataObj[index] == idenValue) {
                    dataObj[surg] = surgValue;
                }
    
                if (Array.isArray(dataObj[index]) || typeof dataObj[index] === 'object') {
                    this.alter(dataObj[index],iden,idenValue,surg,surgValue);
                }
                
            }
            this.updateLocal(dataObj); 
        }
    }
}); 


