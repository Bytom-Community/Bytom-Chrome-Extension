<style scoped>
.welcome-top {
  height: 534px;
  text-align: center;
  font-size: 15px;
  background: url('../../../assets/welcome.jpeg') no-repeat;
  background-size: 100%;
}
.welcome-top p {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 70px;
}
.welcome-bottom {
  padding: 20px 85px;
}
</style>

<template>
    <div>
        <section class="welcome-top">
            <p>欢迎使用BYTOM精简Chrome钱包</p>
        </section>
        <section class="welcome-bottom bg-green">
            <div class="btn btn-primary" @click="start">开始使用</div>
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
      start: function(){
          this.$emit("next")
      }
  }
};
</script>