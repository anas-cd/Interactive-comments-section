<template>
  <div class="comments">
    <transition-group name="list" mode="out-in" appear>
      <thread-list
        v-for="thread in threads"
        :key="thread.id"
        :threadData="thread"
      ></thread-list>
    </transition-group>
  </div>
  <div class="commentor">
    <commentEditor></commentEditor>
  </div>
  <deleteAlert v-show="isDeleting"></deleteAlert>
</template>

<script>
import threadList from '@/components/threadList.vue';
import commentEditor from '@/components/commentEditor.vue';
import deleteAlert from '@/components/deleteAlert.vue';

export default {
  components: {
    threadList,
    commentEditor,
    deleteAlert,
  },
  created() {
    this.$store.dispatch('fetchAll');
  },
  computed: {
    threads() {
      return this.$store.state.totalThreads;
    },
    isDeleting() {
      return this.$store.state.delAlert.plight;
    },
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0rem;
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  color: #2c3e50;

  .comments {
    width: 100%;
  }

  .commentor {
    border-radius: 1rem;
    width: 100%;
    &.sticky {
      position: sticky;
      bottom: 1.5rem;
      box-shadow: 2px 0px 5px 2px #5457b62e;
    }
  }
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.3s;
}
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.3s;
  position: absolute;
}

.list-move {
  transition: all 0.3s ease;
}
</style>
