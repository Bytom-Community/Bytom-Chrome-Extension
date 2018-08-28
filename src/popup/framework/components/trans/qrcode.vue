<style scoped>
.warp {
  width: 200px;
  margin: 175px auto;
  border-radius: 5px;
  text-align: center;
  padding: 30px;
}
img {
  width: 150px;
  height: 150px;
}
p {
  word-wrap: break-word;
}
</style>

<template>
    <transition name="page-transfer"
        enter-active-class="animated zoomIn faster" 
        leave-active-class="animated zoomOut faster">
        <div v-show="show" class="warp bg-gray">
            <i class="iconfont btn-close" @click="show=false">&#xe605;</i>
            <img src="">
            <p>bm1qsgherfsdfdsadfsdfdsfasdfdsdfsafajkjwe2dz8uny</p>
        </div>
    </transition>
</template>

<script>
export default {
  name: "",
  props: {
    addr: "111"
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    open: function() {
      this.show = true;
    }
  }
};
</script>