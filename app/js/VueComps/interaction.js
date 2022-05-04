VueApp.component('interaction', {
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    template: 
    /* html */
    `
    <comment :commentData="context"></comment>
    
    `,
    data: function () {
     return {
        
     }   
    },
    methods: {

    },
    computed: {

    }
});