VueApp.component('comment', {
    props: {
        commentData: {
            type: Object,
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
            <div class="you"><span>you</span></div>
            <p class="date">{{commentData.createAt}}</p>
        </div>
        <div class="action">
            <div class="reply">
                <img src="./images/icon-reply.svg" alt="reply">
                <span>Reply</span>
            </div>
            <div class="delete">
                <img src="./images/icon-delete.svg" alt="delete">
                <span>Delete</span>
            </div>
            <div class="edit">
                <img src="./images/icon-edit.svg" alt="Edit">
                <span>Edit</span>
            </div>
        </div>
        <div class="content"><p>{{commentData.content}}</p>
        </div>
        <textarea name="comment" id="text" cols="30" rows="3" placeholder="Add a comment..."></textarea>
        <button>update</button>
    </div>
    `,
    data: function () { 
        return { 

        }
    },
    methods: {

    },
    computed: {
        image() {return this.commentData.user.image.png}
    }
});