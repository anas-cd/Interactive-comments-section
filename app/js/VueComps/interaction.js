VueApp.component('interaction', {
    emits: ['del'],
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
    <comment :commentData="context" :user="user" :reply="reply" @isReply="replyToggle" @del-alert="deletAlert"></comment>
    <commentor v-if="user.image" :user="user" v-show="reply" :action="sendAction" :commentBy="context.user.username"></commentor> 
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
        }
    },
    computed: {

    }
});