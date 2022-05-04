VueApp.component('commentor', { 
    props: {
        user: {
            type: Object
            ,required: true
        }
    },
    template: 
    /* html */
    `
    <div class="commentor" id="commentor">
        <img :src="avatar" :alt="avatarOf" class="avatar">
        <textarea name="comment" id="text" cols="30" rows="3" placeholder="Add a comment..."></textarea>
        <button>send</button>
        <button>reply</button>
    </div>
    `, 
    data: function () {
        return {
            // isReply: false
        }
    },
    created: function () {
       
        console.log(this.user.image.png);  
          
    },
    methods: {
        
    },
    computed: {
        avatar() {return this.user.image.png}  
        ,avatarOf() {return "avatar of " + this.user.username} 
        ,updater() {return this.user.image.png}
    } 
    
});