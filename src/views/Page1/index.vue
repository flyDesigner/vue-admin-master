<template>
  <div>
    <Button @click="setData">click me</Button>
    <Button @click="showDetail">show detail</Button>
    <textCom @childFn="parentFn"></textCom>
    <br />
    子组件传来的值 : {{message}}
    <Table border :columns="columns5" :data="data5"></Table>
  </div>
</template>
 <script>
import Detail from "./component/Detail.vue";
import textCom from "./component/textCom.vue";
export default {
  name: "page1",
  props: {},
  components: {
    textCom
  },
  created() {},
  mounted() {
    
  },
  data() {
    return {
      fileData: [],
      fileId: "",
      message: "",
      columns5: [
        {
          title: "日期",
          key: "date",
          sortable: true
        },
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("Input", {
                props: {
                  type: "text",
                  value: params.row.name
                },
                attrs: {
                  autofocus: true
                },
                on: {
                  "on-blur": event => {
                    if (event.target.value == "") {
                      this.data5[param.index].valid = "不能为空";
                    } else {
                      params.row.name = event.target.value;
                      this.data5[params.index].name = event.target.value;
                      this.$set(params.row, "$isEdit", false);
                    }
                  }
                }
              });
            } else {
              return h(
                "div",
                {
                  on: {
                    click: () => {
                      this.$set(params.row, "$isEdit", true);
                    }
                  }
                },
                params.row.name
              );
            }
          }
        },
        {
          title: "年龄",
          key: "age",
          sortable: true
        },
        {
          title: "地址",
          key: "address"
        }
      ],
      data5: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          date: "2016-10-03",
          valid: ""
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
          date: "2016-10-01",
          valid: ""
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
          date: "2016-10-02",
          valid: ""
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
          date: "2016-10-04",
          valid: ""
        }
      ]
    };
  },
  methods: {
    parentFn(payload) {
      this.message = payload;
    },
    handleEdit(row) {
      this.$set(row, "$isEdit", true);
    },
    handleSave(row) {
      this.$set(row, "$isEdit", false);
    },
    setData(row) {
      this.data5 = [];
    },
    showDetail() {
      $channel.$emit("mapCenterCoordinate", "123");
      var value = [
        { title: "管线", layer: "pipleLineLayer", checked: true, code: "GX" },
        { title: "阀门", layer: "valveLayer", checked: true, code: "FM" },
        {
          title: "调压设施",
          layer: "regulateDevicesLayer",
          checked: true,
          code: "TYSB"
        },
        {
          title: "阴极保护装置",
          layer: "cathodeTestFacilityLayer",
          checked: true
        },
        {
          title: "无人值守场站",
          layer: "unattendedStationLayer",
          checked: true
        },
        { title: "凝水缸", layer: "condenserCylinderLayer", checked: true },
        { title: "小区", layer: "residentialLayer", checked: true },
        { title: "道路", layer: "roadLayer", checked: true },
        { title: "手绘巡检点", layer: "inspectPointLayer", checked: true },
        { title: "片区", layer: "allPeoPolygonLayer", checked: true }
      ];
      new this.$newPopUp(
        Detail,
        {
          props: {
            allOfPipelineList: value
          }
        },
        () => {}
      );
    }
  }
};
</script>