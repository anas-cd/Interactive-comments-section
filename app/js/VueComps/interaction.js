VueApp.component('interaction', {
    emits: ['del','score','text'],
    props: {
        context: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    template: 
    /* html */
    `
    <comment :commentData="context" :user="user" :reply="reply" @isReply="replyToggle" @del-alert="deletAlert" @score="scoreUpdater" @text="textUpdater"></comment>
    <commentor v-if="user.image" :user="user" v-show="reply" :action="sendAction" :commentBy="context"></commentor> 
    `, 
    data: function () {
     return {
        reply: false,
        sendAction: false
     }   
    },
    methods: {
        replyToggle(status) {
            if (status) {
                this.reply = true; 
            } else {
                this.reply = false; 
            }
        },
        deletAlert() {
            this.$emit('del');
        },
        scoreUpdater(id,score) {
            this.$emit('score',id,score);
        },
        textUpdater(id,message) {
            this.$emit('text',id,message);
        }
    },
    computed: {

    }
});