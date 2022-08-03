VueApp.component('commentor', {
    emits: ['new-thread'], 
    props: {
        user: {
            type: Object
            ,required: true
        },
        action: {
            type: Boolean,
            required: true
        },
        commentBy: {
            type: Object,
            required: false // it works that way 
        }
    },
    template: 
    /* html */
    `
    <div class="commentor" id="commentor">
        <img :src="avatar" :alt="avatarOf" class="avatar">
        <textarea name="comment" id="text" cols="30" rows="3" placeholder="Add a comment..." :class="(!this.action)? 'rep':''">{{ filler }}</textarea>
        <button v-show="this.action" @click="addThread()">send</button>
        <button v-show="!this.action">reply</button>
    </div>
    `, 
    data: function () {
        return {
            // isReply: false
        }
    },
    created: function () {
        
        // console.log(this.user.image.png); 
        
    },
    methods: {
        addThread() {
            const message = document.getElementById('text').value;
            this.$emit('new-thread',message);
        } 
    },
    computed: { 
        avatar() {return this.user.image.png}  
        ,avatarOf() {return "avatar of " + this.user.username} 
        ,updater() {return this.user.image.png},
        filler() {return (!this.action)? "@"+this.commentBy+", ":""}
        
    } 
    
});