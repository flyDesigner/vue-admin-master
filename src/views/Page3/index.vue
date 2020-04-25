<template>
  <div class="hidden-danger-wrapper">
    <div class="hidden-danger-form" style="padding:10px">
      <span style="font-size: 1.5em;font-weight: bold;margin-left:20px">配置工程验收表</span>
    </div>
    <div style="height:86%;text-align:center;padding-top:20px" class="single-table-con">
        <tree-transfer :title="title" :from_data='data1' defaultTransfer width='75%' height='90%'
        :to_data='toData' :defaultProps="defaultProps"  :node_key="'id'" :pid="'parentId'"
        @addBtn='add' @removeBtn='remove' :mode='mode' filter openAll></tree-transfer>
      <Button icon="md-checkmark" type="warning" @click.native="save" >
          确定
      </Button>
    </div>
  </div>
</template>


<script>
import treeTransfer from "./component/transfer-extend.vue"; // 源码位置
import Page5 from "../Page5/index.vue"
export default {
  components: { treeTransfer },
  data() {
    return {
      data1: [
        {
          title: "调压设施",
          parentId: 0,
          id: "1",
          children: [
            {
              title: "(1) 调压设施是否完好",
              parentId: "1",
              id: "2"
            },
            {
              title: "(2) 地基建设是否合格",
              parentId: "1",
              id: "3"
            },
            {
              title: "(3) 是否进行接地",
              parentId: "1",
              id: "4"
            },

            {
              title: "(4) 调压设施",
              parentId: "1",
              id: "5"
            },
            {
              title: "(5) 安全距离是否合理规范",
              parentId: "1",
              id: "6"
            },
            {
              title: "(6) 护栏是否合格",
              parentId: "1",
              id: "7"
            }
          ]
        },
        {
          title: "阀门",
          parentId: 0,
          id: "8",
          children: [
            {
              title: "(1) 是否按图拖工",
              parentId: 8,
              id: "9"
            },
            {
              title: "(2) 阀门手轮或手柄是否齐全",
              parentId: 8,
              id: "10"
            },
            {
              title: "(3) 井内是否整净、粉刷、无积水",
              parentId: 8,
              id: "11"
            },

            {
              title: "(4) 阀体是否锈蚀",
              parentId: 8,
              id: "12"
            }
          ]
        },
        {
          title: "阴极测试桩",
          parentId: 0,
          id: "13",
          children: [
            {
              title: "(1) 测试桩是否完好",
              parentId: "13",
              id: "14"
            },
            {
              title: "(2) 电位是否合格",
              parentId: "13",
              id: "15"
            }
          ]
        },
        {
          title: "管线",
          parentId: 0,
          id: "16",
          children: [
            {
              title: "(4) 是否加装防撞设施",
              parentId: "16",
              id: "20"
            },
            {
              title: "(5) 是否对明管(桥管、架空管)进行防腐处理",
              parentId: "16",
              id: "21"
            },
            {
              title: "(6) 调压相关设施是否防腐",
              parentId: "16",
              id: "22"
            }
          ]
        }
      ],
      mode: "transfer", // transfer addressList
      title:["待配置工程验收表","已配置工程验收表"],
      toData: [
        {
          title: "管线",
          parentId: 0,
          id: "16",
          children: [
            {
              title: "(1) 管线周围5米范围内无施工现象",
              parentId:"16",
              id: "17"
            },
            {
              title: "(2) 无占压现象",
              parentId: "16",
              id: "18"
            },
            {
              title: "(3) 警示标示是否齐全",
              parentId: "16",
              id: "19"
            },
          ]
        }
      ],
      dtoList: [],
      defaultProps: {
        children: "children",
        label: "title",
        id: "id"
      }
    };
  },
  created() {},
  mounted() {
  },
  destroyed() {},
  computed: {
  },
  methods: {
    // 监听穿梭框组件添加
    save(){
      new this.$newPopUp(Page5,{
        },() => {

      })
    },
    // 添加按钮
    add(fromData, toData, obj) {
      
    },
    // 移除按钮
    remove(fromData, toData, obj) {
      
    }
  },
  watch: {},
  filters: {}
};
</script>
<style lang="less" scoped>
.hidden-danger-wrapper{
  .hidden-danger-form {
    padding: 5px 5px 0;
  }
  height: 100%;
}
/* 按钮 位置 */
.tree-transfer {
  position: relative;
  line-height: 1.5;
}
.tree-transfer-operation {
  display: inline-block;
  overflow: hidden;
  margin: 0 16px;
  vertical-align: middle;
}
.ivu-transfer-operation .tree-transfer-operation-btn:first-child {
  margin-bottom: 12px;
}
.tree-transfer-operation-btn {
  display: block;
  min-width: 24px;
}
.tree-transfer-list {
  width: 300px;
  height: 360px;
  display: inline-block;
  font-size: 12px;
  vertical-align: middle;
  position: relative;
  padding-top: 35px;
}
.tree-transfer-list-header {
  padding: 8px 16px;
  background: #f9fafc;
  color: #ffb403;
  border: 1px solid #dddee1;
  border-bottom: 1px solid #e9eaec;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
}
.tree-transfer-list-body {
  height: 100%;
  border: 1px solid #dddee1;
  border-top: none;
  border-radius: 0 0 6px 6px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  padding-top: 4px;
  overflow-y: auto;
}
.btnCommon {
  margin-top: -3px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
</style>