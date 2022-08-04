<template>
  <div class="thread">
    <interactionCard></interactionCard>

    <div class="replys">
      <interactionCard></interactionCard>
    </div>
  </div>
</template>

<script>
import interactionCard from '@/components/interactionCard.vue';
export default {
  name: 'Thread-list',
  components: {
    interactionCard,
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
</style>
