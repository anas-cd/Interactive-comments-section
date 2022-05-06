VueApp.component('alert-blocker', {
    emits: ['alert-cancel'],
    props: {
        
    },
    template:
    /* html */
    `
    <div class="alertBlocker">
        <div class="deleteAlert">
            <h1>Delete comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <button @click="cancel">NO, CANCEL</button>
            <button>YES, DELETE</button>
        </div>
    </div>
    `,
    data: function () {
        return {
            
        }
    },
    methods: {
        cancel() {
            this.$emit('alert-cancel');
        }
    },
    computed: {
        
    }
});