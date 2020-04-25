<template>
  <div>
    <div class="core-modal-mask"></div>
    <div class="core-modal-wrap"  v-show="visible">
      <transition :name="'sidelip-down-modal'" @after-leave="afterLeave" @after-enter="afterEnter">
        <div id="context-box" class="core-modal" :style="contentStyles"  v-if="state > -99" ref="content">
        <!-- <div class="core-modal" :style="{'width':width+'px' , 'top': top+'px' ,'height': top == 60 ? 'calc(100% - 110px)': 'calc(100% - 150px)'}"  v-if="state > -99" ref="content"> -->
          <a class="ivu-modal-close" @click="hide" >
            <Icon type="ios-close"></Icon>
          </a>
          <div id="header-p" class="core-modal-header"  @mousedown="handleMoveStart" :style="{'cursor': draggable  ? 'move': 'auto'}" style="min-height: 34px;">
            <h2>{{title}}</h2>
          </div>
          <div class="core-modal-body" style="padding:0px;" :style="{'max-height': top == 30 ? 'calc(100% - 64px)': 'calc(100% - 90px)'}">
            <slot></slot>
          </div>
          <div :class="{'core-modal-footer':true,'core-modal-footer-align':isCenter}" v-if="isShowFoot" >
            <Button style="height:28px;" :loading="actionState[item.action]" @click.native="item.handle()" v-for="(item,index) in actions" :key="index" :type="item.theme" :icon="item.icon" >
              <span>
                <i style="margin-left:-2px;padding-right:3px;font-size:10px;" :class="item.iconf"/>{{item.text}}</span>
              </Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="less">
@import "./index.less";
</style>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isShowFoot:true,
      state: -99,
      actions: [],
      actionState: {},
      title: "",
      width: 600,
      getMoveHeight:false,
      top: 60,
      leftAdjust: 60,
      modalClass: "",
      isCenter: false,
      visible: true,
      draggable: false,
      dragData: {
        x: null,
        y: null,
        dragX: null,
        dragY: null,
        dragging: false
      }
    };
  },
  computed: {
    // leftAdjust() {
    //   const width = parseInt(this.width);
    //   let screenWidth =  document.body.scrollWidth;
    //   let leftAdjust = (screenWidth - width)/2;
    //   return leftAdjust;
    // },
    contentStyles () {
      const width = parseInt(this.width);
      const top = parseInt(this.top);
      let height;
      if(top == 60){
        height = "calc(100% - 90px)";
      }else if(top == 30){
        height = "calc(100% - 30px)";
      }else if(top == 0){
        height = "calc(100% - 0px)";
      }else{
        height = "calc(100% - 130px)";
      }
      //const height = top == 60 ? 'calc(100% - 90px)': 'calc(100% - 130px)'; 
      let style = {
        width: `${width}px`,
        top: `${top}px`,
        height:`${height}`
      };
      if (this.draggable) {
          if (this.dragData.x !== null){
            let left = this.dragData.x - this.leftAdjust;
            style.left = `${left}px`;
          } 
          if (this.dragData.y !== null) style.top = `${this.dragData.y}px`;
      } else{
        style.height = `${height}`;
      }
      return style;
    },

  },
  created: function() {
    window.addEventListener('resize', this.getWidth);
    
  },
  beforeMount: function() {},
  mounted: function() {
    this.state = -1;  
    this.$nextTick(() =>{
      this.getWidth();
    })
  },
  beforeDestroy: function() {},
  destroyed: function() {
    document.body.removeChild(this.$el);
  },
  methods: {
    getWidth(){
      const width = parseInt(this.width);
      let screenWidth =  document.body.scrollWidth;
      this.leftAdjust = (screenWidth - width)/2;
    },
    hide() {
      this.state = -99;
      window.$instanceModalArray.pop();
      $channel.$emit("closeEvent", this.state);
    },
    setTitle(title) {
      this.title = title;
    },
    setPageActions(data) {
      this.actions = data;
      for (let a of this.actions) {
        if (!!a.action) {
          this.actionState[a.action] = false;
        }
      }
    },
    setActionsState(action, state) {
      this.actionState[action] = state;
      this.$forceUpdate();
    },
    setSize(width) {
      this.width = width;
    },
    setFootShow(isShowFoot){
      this.isShowFoot =isShowFoot
    },
    setTopSize(top) {
      this.top = top;
    },
    //设置底部按钮居中效果的方法
    setButtonCenter() {
      this.isCenter = true;
    },
    //窗口可拖动
    setModalMove() {
      this.draggable = true;
    },
    setHeightOfModal() {
      this.getMoveHeight = false;
    },
    afterLeave() {
      this.$destroy();
    },
    afterEnter() {
      this.state = 0;
    },
    handleMoveStart(event) {
      if (!this.draggable) return false;

      const $content = this.$refs.content;
      const rect = $content.getBoundingClientRect();
      this.dragData.x = rect.x;
      this.dragData.y = rect.y;

      const distance = {
        x: event.clientX,
        y: event.clientY
      };

      this.dragData.dragX = distance.x;
      this.dragData.dragY = distance.y;

      this.dragData.dragging = true;
      window.onmousemove = this.handleMoveMove;
      window.onmouseup = this.handleMoveEnd;
    },
    handleMoveMove(event) {
      if (!this.dragData.dragging) return false;

      const distance = {
        x: event.clientX,
        y: event.clientY
      };

      const diff_distance = {
        x: distance.x - this.dragData.dragX,
        y: distance.y - this.dragData.dragY
      };

      this.dragData.x += diff_distance.x;
      this.dragData.y += diff_distance.y;

      this.dragData.dragX = distance.x;
      this.dragData.dragY = distance.y;
    },
    handleMoveEnd() {
      this.dragData.dragging = false;
      window.offmousemove = this.handleMoveMove;
      window.offmouseup = this.handleMoveEnd;
    }
  },
  watch: {},
  directives: {}
};
</script>
