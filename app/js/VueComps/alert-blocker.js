VueApp.component('alert-blocker', {
    props: {
 
    },
    template:
    /* html */
    `
    <div class="alertBlocker">
        <div class="deleteAlert">
            <h1>Delete comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <button>NO, CANCEL</button>
            <button>YES, DELETE</button>
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
        
    }
});