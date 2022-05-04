// Global
app.global = {
    init: function(){ // Load all global functions here
        console.log("load global functions");
        app.global.loadHeader();
    },
    loadHeader: function(){ // Some specific function
        console.log("loadHeader()");
        
    },
    fetcher: async function (updater) {
        console.log("fetcher entered");
        const responce = await fetch('./app/js/data/data.json');
        let data = await responce.json();
        
        
        updater(data);
    }
};

// Run the global stuff
app.global.init();

// methods of getting the body of the promise from fetcher: 

//1) IIFE (Immediately invoked function expression) for using await at the top level

// (async function() {
//     let dataObj = await app.global.fetcher(); 
//     console.log(dataObj);
// })();


//2) using a callback functino:
 
// function updater(data) {
//     // the code in here will run whenever the fetcher finishes
//     console.log(data);
//     console.log("HELLLOOOO");
//     return data; 
// }
// app.global.fetcher(updater); // here we are passing the updater function as a callback function


