VueApp.component('comment', {
    props: {
        commentData: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        reply: {
            type: Boolean,
            required: true
        }
    }, 
    template: 
    /* html */
    `
    <div class="comment">
        <div class="votes">
            <div class="upvote"><img src="./images/icon-plus.svg" alt="up vote"></div>
            <div class="voteNumber">{{commentData.score}}</div>
            <div class="downvote"><img src="./images/icon-minus.svg" alt="down vote"></div>
        </div>
        <div class="commentInfo">
            <img :src="image" alt="image-amyrobson" class="icon">
            <span class="username">{{commentData.user.username}}</span>
            <div class="you" v-show="isCurrentUser"><span>you</span></div>
            <p class="date">{{commentData.createdAt}}</p>
        </div>
        <div class="action">
            <div class="reply" v-show="!isCurrentUser && !reply" @click="replyEmiter">
                <img src="./images/icon-reply.svg" alt="reply">
                <span>Reply</span>
            </div>
            <div class="reply" v-show="!isCurrentUser && reply" @click="replyEmiter">
                <img src="./images/icon-reply.svg" alt="reply">
                <span>Cancel Reply</span>
            </div>
            <div class="delete" v-show="isCurrentUser" @click="deletEmiter">
                <img src="./images/icon-delete.svg" alt="delete">
                <span>Delete</span>
            </div>
            <div class="edit" v-show="isCurrentUser && !editMode" @click="editToggle">
                <img src="./images/icon-edit.svg" alt="Edit">
                <span>Edit</span>
            </div>
            <div class="edit" v-show="isCurrentUser && editMode" @click="editToggle">
                <img src="./images/icon-edit.svg" alt="Edit">
                <span>Discard</span>
            </div>
        </div>
        <div class="content" v-show="!editMode"><p>{{commentData.content}}</p>
        </div>
        <textarea name="comment" id="text" cols="30" rows="3" placeholder="Add a comment..." v-show="editMode">{{commentData.content}}</textarea>
        <button v-show="editMode">UPDATE</button>
    </div>
    `,
    data: function () { 
        return { 
            editMode: false,
            isCurrentUser: this.currentUserCheck()
        }
    },
    methods: {
        currentUserCheck() {
            if (this.user.username == this.commentData.user.username) {
                return true;
            }else return false; 
        },
        editToggle() {
            if (this.editMode) {
                this.editMode = false;
            } else {
                this.editMode = true; 
            }
        },
        replyEmiter() {
            if (this.reply) {
                this.$emit('isReply',false);
            } else {
                this.$emit('isReply',true);
            }
        },
        deletEmiter() {
            this.$emit('del-alert');
        }
    },
    computed: {
        image() {return this.commentData.user.image.png},
        
    }
});