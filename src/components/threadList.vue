<template>
  <div class="thread">
    <interactionCard
      :interactionData="threads"
      :key="threadData.id"
    ></interactionCard>
    <div class="replys" v-if="threads.replies.length">
      <interactionCard
        v-for="reply in threads.replies"
        :key="reply.id"
        :interactionData="reply"
      ></interactionCard>
    </div>
  </div>
</template>

<script>
import interactionCard from '@/components/interactionCard.vue';
export default {
  props: ['threadData'],
  name: 'Thread-list',
  components: {
    interactionCard,
  },
  porps: {
    threadData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    threads() {
      return this.threadData;
    },
  },
};
</script>

<style scoped lang="scss">
.thread {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  .replys {
    border-left: 2px solid $light_gray;
    padding-left: 2rem;
    margin-left: 2rem;
    margin-bottom: 1rem;

    @media #{$mq-620-down} {
      margin-left: 1rem;
      padding-left: 1rem;
    }

    // & > .comment {
    //   &:last-child {
    //     margin-bottom: 0;
    //   }
    //   & > textarea {
    //     grid-row-start: 3;
    //     grid-row-end: 4;
    //     grid-column-start: 2;
    //     grid-column-end: 4;
    //     margin: 0;
    //     @media #{$mq-620-down} {
    //       grid-column-start: 1;
    //       grid-column-end: 3;
    //       grid-row-start: 3;
    //       grid-row-end: 4;
    //     }
    //   }
    // }

    // & > .commentor {
    //   margin-top: -0.5rem;
    //   margin-bottom: 0.5rem;
    // }
    // & > .replys {
    //   border-left: none;
    //   padding-left: none;
    //   margin-left: none;
    // }
  }

  // & > .commentor {
  //   margin-top: -0.5rem;
  //   margin-bottom: 0.5rem;
  // }
}
.replies-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.replies-enter-to {
  opacity: 1;
  transform: scale(1);
}
.replies-enter-active {
  transition: all 0.3s;
}
.replies-leave-from {
  opacity: 1;
  transform: scale(1);
}
.replies-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.replies-leave-active {
  transition: all 0.3s;
  position: absolute;
}

.replies-move {
  transition: all 0.3s ease;
}
</style>
