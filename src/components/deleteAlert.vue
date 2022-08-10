<template>
  <div class="alertBlocker">
    <div class="deleteAlert">
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <button @click="cancel()">NO, CANCEL</button>
      <button @click="del()">YES, DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deleteAlert',
  methods: {
    cancel() {
      this.$store.dispatch('delPrompt', {
        id: this.$store.state.delAlert.delId,
        isRep: false,
      });
    },
    del() {
      this.$store.dispatch('delComment', {
        isRep: this.$store.state.delAlert.isRep,
        id: this.$store.state.delAlert.delId,
      });
      this.$store.dispatch('delPrompt', this.$store.state.delAlert.delId);
    },
  },
};
</script>

<style scoped lang="scss">
.alertBlocker {
  position: fixed;
  height: 110vh;
  position: fixed;
  width: 100vw;
  transform: translateY(-5rem);
  background-color: #000000a3;

  .deleteAlert {
    max-width: 400px;
    height: auto;
    background-color: $white;
    border-radius: 0.5rem;
    display: flex;
    flex-flow: row wrap;
    padding: 2rem;
    position: relative;
    margin: 0 auto;
    transform: translateY(-50%);
    top: 50%;
    & > h1 {
      font-size: 1.7rem;
      font-weight: 700;
      color: $dark_blue;
      justify-self: start;
      text-transform: none;
    }
    & > p {
      color: $grayish_blue;
    }
    & > button {
      color: $white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      width: 9.5rem;
      font-size: 1rem;
      &:first-child {
        background-color: $grayish_blue;
      }
      &:last-child {
        background-color: $soft_red;
        margin-left: auto;
      }
    }
  }
}
</style>
