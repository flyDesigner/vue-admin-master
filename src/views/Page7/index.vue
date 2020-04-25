<template>
    <div>
      <div class="iview-tree">
          <NewTree :data="layerDatas" show-checkbox ref="orgTree"  @on-check-change="onTreeChange"></NewTree>       
      </div>
      <div class="element-tree">
        <el-tree  :data="layerDatas" show-checkbox  ref="orgTree1"   node-key="layer" :props="orgTreeProps" default-expand-all	@check-change="getTreeChange"></el-tree>
      </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      orgTreeProps:{
          label: 'title',
          children: 'children'
      },
      layerDatas: [
        {
          title: "管理图层：",
          expand: true,
          children: [
            { title: "人员", layer: "peoLayer", checked: true },
            { title: "车辆", layer: "carLayer", checked: true },
            { title: "隐患", layer: "dangerLayer", checked: true },
            { title: "工地", layer: "constructionLayer", checked: true },
          ]
        },
        {
          title: "业务分类图层：",
          expand: true,
          children: [
            { title: "管网概览", layer: "pipeNetworkLayer", checked: false },
            {
              title: "作业类型：",
              layer:"inspectTypeLayer",
              expand: false,
              children: [
                { title: "巡查", layer: "inspectPeoPLayer", checked: true },
                { title: "维保", layer: "equipmentPeoPLayer", checked: false },
                { title: "检漏", layer: "leakHuntingLayer", checked: false }
              ]
            }
          ]
        },
        {
          title: "基础元素图层：",
          expand: true,
          children: [
            { title: "管线", layer: "pipleLineLayer", checked: true , code: "GX" },
            { title: "阀门", layer: "valveLayer", checked: true , code: "FM" },
            { title: "调压设施",layer: "regulateDevicesLayer",checked: true , code: "TYSB" },
            { title: "阴极保护装置",layer: "cathodeTestFacilityLayer",checked: true },
            { title: "无人值守场站",layer: "unattendedStationLayer",checked: true },
            { title: "凝水缸",layer: "condenserCylinderLayer",checked: true },
            { title: "小区",layer: "residentialLayer",checked: true },
            { title: "道路",layer: "roadLayer",checked: true },
            { title: "手绘巡检点", layer: "inspectPointLayer", checked: true },
            { title: "片区", layer: "allPeoPolygonLayer", checked: true }
          ]
        }
      ]
    };
  },
  created() {
  },
  mounted() {
    
  },
  destroyed() {},
  computed: {},
  methods: {
    getTreeChange(node,curNode,oldnode) {
      debugger
    },
    onTreeChange(node,curNode) {
      debugger
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.iview-tree{
  width: 300px;
  height: 400px;
  overflow-y: auto;
  display: inline-block;
}
.element-tree{
  width: 300px;
  height: 400px;
  overflow-y: auto;
  display: inline-block;
}
</style>