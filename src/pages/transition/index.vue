<template>
  <div class="transition-wrapper">
    <div class="btn-group">
      <el-button type="primary" @click="add">add</el-button>
      <el-button type="primary" @click="remove">sub</el-button>
    </div>
    <transition-group tag="div" class="card-wrapper" name="card">
      <div class="card" :key="box" v-for="box in boxes">
        {{ `box-${box}` }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      boxes: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    add() {
      const number = Math.floor(Math.random() * 100);
      this.boxes = this.boxes.concat(number);
    },
    remove() {
      const randomIdx = Math.floor(Math.random() * this.boxes.length);
      this.boxes = this.boxes.filter((o, i) => i !== randomIdx);
    }
  }
};
</script>

<style lang="scss" scoped>
.transition-wrapper {
  .card-wrapper {
    margin-left: 20px;
    margin-top: 20px;
    width: 300px;
    text-align: center;

    .card {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      width: 140px;
      height: 100px;
      font-size: 16px;
      background-color: #bdbdbd;
      border: 1px solid #e6e6e6;

      &.card-enter-active {
        transition: all 1s;
      }

      &.card-leave-active {
        position: absolute;
        transition: all 1s;
      }
    }

    .card-move {
      transition: transform 1s;
    }

    .card-leave-to {
      opacity: 0;
      transform: translate(50px, 0);
    }

    .card-enter {
      z-index: 99;
      opacity: 0;
      transform: translate(0, 30px);
    }
  }

  .btn-group {
    position: fixed;
    left: 50%;
  }
}
</style>
