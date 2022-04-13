// Global
app.global = {
    init: function(){ // Load all global functions here
        console.log("load global functions");
        app.global.loadHeader();
    },
    loadHeader: function(){ // Some specific function
        console.log("loadHeader()");
    },
    fetcher: function (filePath) {
        
    }
};



// Run the global stuff
app.global.init();


// Vue 
const VueApp = Vue.createApp({
    data: function() {
        return {
            test: 'heeeee'
        }
    }
}); 
