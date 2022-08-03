VueApp.component('thread', {
    emits: ['score','text'], 
    props: {
        commentin: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required:true
        }
    },
    template:  
    /* html */
    `
    <div class="thread"> 
        <interaction :context="commentin" :user="user" @del="alert(commentin.id)" :key="commentin.id" @score="scoreUpdater" @text="textUpdater"></interaction>
        <div class="replys" v-show="isReplied">
            <interaction v-for="(reply,index) in commentin.replies" :user="user" :context="reply" @del="alert(index)" :key="reply.id" @score="scoreUpdater" @text="textUpdater"></interaction> 
        </div>
    </div>
    `,
    data: function () {
     return {  
         
     }
    },
    methods: { 
        alert(key) {
            this.$emit('delete',key);
        },
        scoreUpdater(id,score) {
            this.$emit('score',id,score);
        },
        textUpdater(id,message) {
            this.$emit('text',id,message);
        }
    },
    computed: {
        isReplied() {return (this.commentin.replies <= 0)? false:true} 
    }
});