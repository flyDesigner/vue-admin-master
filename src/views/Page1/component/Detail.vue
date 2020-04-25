<template>
 <div style="padding:4px 4px 10px 4px;background-color: #f2f2f2;">
        <div class="modal-card">
            <!-- <div class="modal-card-head">
                <div class="header-basic-information">列表</div>                             
            </div> -->
            <div class="modal-card-body" >
                    <!-- <div v-for="(value,key) in allOfPipeNetWork" :key="value" class="half-item">
                        <span>{{key}}:</span>
                        <span :title="value">{{!value?"无":value}}</span>
                    </div> -->
                    <ul class="ul-list">
                        <li v-for="item in this.allOfPipelineList" :key="item.id">
                        <span class="" :title="`${item.title}`">
                            {{ item.title }}
                        </span>
                        <a :href="item.fullPath" @click="getPipelineDetail(item.attr)">详情</a>
                        </li>
                    </ul>
            </div>     
        </div>        
 </div>    
 </template>

<script>
// import PipelineDetail from "./PipelineDetail";
export default {
  components: {},
  props: {
    allOfPipelineList: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
        size: "small",
        value1: 0
    };
  },
  created() {
    this.$emit("setTitle", "管网详情列表");
    this.$emit("setPageSize", 500);
    this.init();
    this.$emit("setModalMove");
    this.$emit("setFootShow",false);
    
  },
  mounted() {
      
  },
  methods: {
    init(){
    },
    getPipelineDetail(value) {
        // new this.$newPopup(
        //     PipelineDetail,
        //     {
        //         props: {
        //         allOfPipeNetWork: value
        //         }
        //     },
        //     () => {
                
        //     }
        // );
    }
  }
};
</script>
<style lang='less'>
.header-basic-information {
    font-weight: 600;
    position: relative;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #333333;
    background: #ffffff;
    padding: 7px 12px;
    border-left: 3px solid #ffb403;
    line-height: 1;
    overflow: hidden;
}
.modal-radius-card {
    border: 1px solid;
    border-color: #d0d0d0;
    background: #fff;
    border-radius: 6px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
}
.modal-card {
    border: 1px solid #dddee1;
    border-color: #e9eaec;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
}
.modal-card-head {
    border-bottom: 1px solid #dcdcdc;
    padding: 2px 0 2px 5px;
    line-height: 1;
}
.modal-card-body {
    padding: 6px 10px 5px 10px;
}
.modal-card-body-headerinfo{
    font-size: 12px;
    color: #ffb403;
    line-height: 30px;
}
.ivu-row {
    margin-bottom: 1px !important;
}
.blank-display-area{
    border: 1px solid #dddee1;
    border-color: #e9eaec;
    background: #fff;
    border-radius: 4px;
    width:100%;
    height:150px;
    text-align:center;
}
.ul-list{
    span{
        cursor: pointer;
        transition: color .2s ease-in-out;
        color: #606266;
        display: inline-block;
        width: 400px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    li{
        position: relative;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        line-height: 30px;
    }
    a{
        float: right;
        display: inline-block;
    }
    button{
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 0;
        &:hover{
            color: #444;
        }
    }
    &:hover{
        & > span{
            color: #2d8cf0;
        }
    }
}
</style>