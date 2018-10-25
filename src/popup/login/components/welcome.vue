<style>
.welcome-top {
  height: 505px;
  text-align: center;
  font-size: 18px;
  background: url("../../../assets/welcome.jpeg") no-repeat;
  background-size: 100%;
}
.welcome-top p {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
}
.welcome-bottom {
  height: 95px;
}
.btn-startup {
  width: 200px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}
</style>

<template>
    <div>
        <section class="welcome-top">
            <p>欢迎使用BYTOM精简Chrome钱包</p>
        </section>
        <section class="welcome-bottom bg-green">
            <div class="btn btn-primary btn-startup" @click="start">开始使用</div>
        </section>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    start: function() {
      this.$emit("next");
    }
  }
};
</script>