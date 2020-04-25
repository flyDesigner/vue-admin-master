<template>
  <div class="scs-demo">
    <!-- <Page :total="0" current="1" />
    <Row :gutter="16">
      <Col span="4">
        <div class="demo-label">Hello World!</div>
      </Col>
      <Col span="20">
        <div class="demo-input">
          <Input placeholder="Hello World" v-model="value" @keyup.enter.native="getKeyEnter($event)" />
        </div>
      </Col>
    </Row> -->
    <el-tree
      :data="data"
      show-checkbox
      
      node-key="layer"
      ref="tree"
      highlight-current
      :props="defaultProps"
      @check="checkChange"
      :default-checked-keys="checkList"
    ></el-tree>
    <SelectTable :columns="gridColumns" :data="gridData"></SelectTable>
  </div>
</template>
<script>
export default {
  name: "scs-demo",
  components: {},
  data() {
    return {
      value: "",
      oriData: [
        {
          title: "管理图层：",
          expand: true,
          children: [
            { title: "人员", layer: "peoLayer" },
            { title: "车辆", layer: "carLayer" },
            { title: "隐患", layer: "dangerLayer" },
            { title: "工地", layer: "constructionLayer" }
          ]
        },
        {
          title: "业务分类图层：",
          expand: true,
          children: [
            { title: "管网概览", layer: "pipeNetworkLayer" },
            {
              title: "作业类型：",
              layer: "inspectTypeLayer",
              expand: false,
              children: [
                { title: "巡查", layer: "inspectPeoPLayer" },
                { title: "维保", layer: "equipmentPeoPLayer" },
                { title: "检漏", layer: "leakHuntingLayer" }
              ]
            }
          ]
        },
        {
          title: "基础元素图层：",
          expand: true,
          children: [
            { title: "管线", layer: "pipleLineLayer", code: "GX" },
            { title: "阀门", layer: "valveLayer", code: "FM" },
            { title: "调压设施", layer: "regulateDevicesLayer", code: "TYSB" },
            { title: "阴极保护装置", layer: "cathodeTestFacilityLayer" },
            { title: "无人值守场站", layer: "unattendedStationLayer" },
            { title: "凝水缸", layer: "condenserCylinderLayer" },
            { title: "小区", layer: "residentialLayer" },
            { title: "道路", layer: "roadLayer" },
            { title: "手绘巡检点", layer: "inspectPointLayer" },
            { title: "片区", layer: "allPeoPolygonLayer" }
          ]
        }
      ],
      checkList: ["peoLayer", "pipleLineLayer", "valveLayer"],
      data: [],
      selectedKeys: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      gridColumns: [
        {
          label:"名称",
          key:"name",
          width:"150px"
        },
        {
          label:"能量",
          key:"power",
          width:"120px"
        },
        {
          label:"能量",
          key:"power",
          width:"120px"
        }
      ],
      gridData: [
        { name: "Chuck Norris", power: 2000 },
        { name: "Bruce Lee", power: 9000 },
        { name: "Jackie Chan", power: 7000 },
        { name: "Jet Li", power: 8000 }
      ]
    };                        
  },
  props: {},
  created() {
    this.data = JSON.parse(JSON.stringify(this.oriData));
  },
  methods: {
    checkChange(node, selected) {
      debugger;
      this.selectedKeys = this.$refs.tree.getCheckedKeys();
      if (node.id == 9) {
        this.data = JSON.parse(JSON.stringify(this.oriData));
        this.data[2].children.pop();
        this.$refs.tree.setCheckedKeys(this.selectedKeys);
      }
      if (node.id == 10) {
        this.data = JSON.parse(JSON.stringify(this.oriData));
        this.$refs.tree.setCheckedKeys(this.selectedKeys);
      }
    },
    getKeyEnter(e){
      debugger
    }
  }
};
</script>
<style lang="less">
.scs-demo {
  height: 100%;
  width: 50%;

  .demo-label {
    height: 32px;
    line-height: 32px;
  }
}
</style>
