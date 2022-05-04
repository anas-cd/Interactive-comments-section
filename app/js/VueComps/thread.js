VueApp.component('thread', { 
    props: {
        commentin: {
            type: Object,
            required: true
        }
    },
    template: 
    /* html */
    `
    <div class="thread"> 
        <interaction :context="commentin"  :key="commentin.id"></interaction>
        <div class="replys" v-show="isReplied">
            <interaction v-for="(reply,index) in commentin.replies" :context="reply"  :key="index"></interaction> 
        </div>
    </div>
    `,
    data: function () { 
     return { 
         
     }
    },
    methods: { 

    },
    computed: {
        isReplied() {return (this.commentin.replies <= 0)? false:true} 
    }
});