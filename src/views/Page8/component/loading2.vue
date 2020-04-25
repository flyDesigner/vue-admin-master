<template>
    <transition name="fade">
        <div class="loading" >
            <div class="loading-spin-main">
                <span class="loading-spin-dot"></span>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.loading {
    border: 1px solid #dcdee2;
    border-top: 0;
    border-left: 0;
}
.loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: hsla(0,0%,100%,.9);
}
.loading {
    color: #2d8cf0;
    vertical-align: middle;
    text-align: center;
}


.loading .loading-spin-main {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.loading-spin-dot {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    background-color: #2d8cf0;
    width: 20px;
    height: 20px;
    -webkit-animation: ani-spin-bounce 1s 0s ease-in-out infinite;
    animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}
@keyframes ani-spin-bounce {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>