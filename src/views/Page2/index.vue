<template>
    <div style="height:100%;padding-top:10px">
        <Row>
          <Col span="17" offset="3" style="text-align:center;margin-bottom:10px"> 
            <div>
              <span style="font-weight:bold">巡检间隔区间</span>
              <TimePicker format="HH:mm" type="timerange"  placeholder="选择巡检间隔区间" style="width:40%" confirm v-model="lightenDate" ></TimePicker>
              <Button style="margin-left:80px;margin-right:5px" @click="reset" type="info" icon="loop">恢复默认</Button>
              <Button  @click="save" type="warning" icon="android-archive">保存</Button>
              
            </div>
          </Col>
          <Col span="17" offset="3">
              <div style="margin-bottom:0px;;border:1px solid #dddee1;border-bottom-width: 0px;border-right-width: 0px;display:flex">
                  <div style="width:19%;text-align:center;">
                    <div style="height:calc(50% - 9px);width:100%"></div>
                    <div style="font-weight:bold;margin:0 auto">巡检间隔时间</div>
                  </div>
                  <div style="width:81%;height:100%;overflow-y:auto;">
                    <Table :columns="columns1" border  :data="fixedList" style="border-collapse: collapse;"></Table>
                  </div>     
              </div>
              <div style="border:1px solid #dddee1;border-right-width: 0px;display:flex">               
                  <div style="width:19%;text-align:center;">
                    <div style="height:calc(50% - 9px);width:100%"></div>
                    <div style="font-weight:bold;margin:0 auto">其他周期间隔</div>
                  </div>
                  <div style="width:81%;height:100%;overflow-y:auto;">
                    <Table :columns="columns2" :show-header="false" height="240" border :data="noFixedList" ></Table>
                  </div>     
              </div>
          </Col>
          <Col span="17" offset="3" style="text-align:center">
            
          </Col>
      </Row>
    </div> 
 </template>


<script>
export default {
  components: {},
  data() {
    return {
      videoForm:{
        videoCode:"",
        policyName:"",
        regionalType:"",
        videoCode:"",
        videoCode:"",
        
      },
      columns1: [
        {
          title: "周期",
          align: "center",
          key:"inspectCycleUnit",
          width:110,
          render: (h,param) => {
            return h("img",{
              attrs: {
                src: "../../../../../../static/images/" + param.row.inspectCycleUnit +".png",
                style: 'width: 32px;height: 32px;',
              },
            })
          }
        },
        {
          title: "最小间隔天数",
          key: "interalDaysF",
          align: "center",
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.intervalDaysF
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.fixedList[param.index].validDaysF = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.fixedList[param.index].validDaysF = "最小间隔天数只能为整数";
                      }else if(event.target.value <0 || event.target.value > param.row.inspectCycleDays){
                        this.fixedList[param.index].validDaysF = "最小间隔天数不能小于0或者大于周期";
                      }else{
                        this.fixedList[param.index].validDaysF = "";
                      }
                      this.fixedList[param.index].intervalDaysF = event.target.value;
                    }
                  }
                }),
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validDaysF
                    },
                    style: {
                      color: "red"
                    }
                  },
                  param.row.validDaysF
                )
              ]
            );
          }
        },
        {
          title: "最大间隔天数",
          key: "interalDaysT",
          align: "center",
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.intervalDaysT
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.fixedList[param.index].validDaysT = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.fixedList[param.index].validDaysT = "最大间隔天数只能为整数";
                      }else if(event.target.value < param.row.inspectCycleDays || event.target.value > param.row.inspectCycleDays*2){
                        this.fixedList[param.index].validDaysT = "最大间隔天数不能小于周期值或者大于周期值的两倍";
                      }else{
                        this.fixedList[param.index].validDaysT = "";
                      }
                      this.fixedList[param.index].intervalDaysT = event.target.value;
                    }
                  }
                }),
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validDaysT 
                    },
                    style: {
                      color: "red"
                    }
                  },
                  param.row.validDaysT 
                )
              ]
            );
          }
        },
        {
          title: "提醒天数",
          key: "earlyWarnDays",
          align: "center",
          width:150,
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.earlyWarnDays
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.fixedList[param.index].validearlyWarnDays = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.fixedList[param.index].validDaysT = "提醒天数只能为整数";
                      }else if(event.target.value <0 || event.target.value > param.row.inspectCycleDays){
                        this.fixedList[param.index].validearlyWarnDays = "提醒天数不能小于0或者大于周期";
                      }else{
                        this.fixedList[param.index].validearlyWarnDays = "";
                      }
                      this.fixedList[param.index].earlyWarnDays = event.target.value;
                    }
                  }
                }),
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validearlyWarnDays 
                    },
                    style: {
                      color: "red"
                    }
                  },
                  param.row.validearlyWarnDays 
                )
              ]
            );
          }
        }
      ],
      columns2: [
        {
          title: "周期",
          key: "inspectCycleValue",
          align: "center",
          width:110,
          render: (h, param) => {
            let vm = this;
            return h("Input", {
              props: {
                type: "text",
                value: param.row.inspectCycleValue,
                readonly:true
              },
              on: {
                "on-blur": event => {
                }
              }
            });
          }
        },
        {
          title: "最小间隔天数",
          align: "intervalDaysF",
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.intervalDaysF
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.noFixedList[param.index].validDaysF = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.noFixedList[param.index].validDaysF = "最小间隔天数只能为整数";
                      }else if(event.target.value <0 || event.target.value > param.row.inspectCycleValue){
                        this.noFixedList[param.index].validDaysF = "最小间隔天数不能小于0或者大于周期";
                      }else{
                        this.noFixedList[param.index].validDaysF = "";
                      }
                      this.noFixedList[param.index].intervalDaysF = event.target.value;
                    }
                  }
                }),
                // 实现表单验证效果，当最小间隔天数不符合规范的时候，显示出的提示语
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validDaysF
                    },
                    style: {
                      color: "red"
                    }
                  },
                  // 该字段仅仅为了实现表单验证效果，不对其他操作造成任何影响
                  param.row.validDaysF
                )
              ]
            );
          }
        },
        {
          title: "最大间隔天数",
          align: "intervalDaysT",
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.intervalDaysT
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.noFixedList[param.index].validDaysT = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.noFixedList[param.index].validDaysT = "最大间隔天数只能为整数";
                      }else if(event.target.value < param.row.inspectCycleValue || event.target.value > param.row.inspectCycleValue*2){
                        this.noFixedList[param.index].validDaysT = "最大间隔天数不能小于周期值或者大于周期值的两倍";
                      }else{
                        this.noFixedList[param.index].validDaysT = "";
                      }
                      this.noFixedList[param.index].intervalDaysT = event.target.value;
                    }
                  }
                }),
                 // 实现表单验证效果，当最小间隔天数不符合规范的时候，显示出的提示语
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validDaysT 
                    },
                    style: {
                      color: "red"
                    }
                  },
                  // 该字段仅仅为了实现表单验证效果，不对其他操作造成任何影响
                  param.row.validDaysT 
                )
              ]
            );
          }
        },
        {
          title: "提醒天数",
          align: "center",
          width:150,
          render: (h, param) => {
            let vm = this;
            return h(
              "div",
              {
                props: {}
              },
              [
                h("Input", {
                  props: {
                    type: "text",
                    value: param.row.earlyWarnDays
                  },
                  on: {
                    "on-blur": event => {
                      if(event.target.value == ""){
                        this.noFixedList[param.index].validearlyWarnDays = "不能为空";
                      }else if(!/^[0-9]*$/.test(event.target.value)){
                        this.noFixedList[param.index].validDaysT = "提醒天数只能为整数";
                      }else if(event.target.value <0 || event.target.value > param.row.inspectCycleValue){
                        this.noFixedList[param.index].validearlyWarnDays = "提醒天数不能小于0或者大于周期";
                      }else{
                        this.noFixedList[param.index].validearlyWarnDays = "";
                      }
                      this.noFixedList[param.index].earlyWarnDays = event.target.value;
                    }
                  }
                }),
                 // 实现表单验证效果，当最小间隔天数不符合规范的时候，显示出的提示语
                h(
                  "span",
                  {
                    attrs: {
                      title: param.row.validearlyWarnDays 
                    },
                    style: {
                      color: "red"
                    }
                  },
                  // 该字段仅仅为了实现表单验证效果，不对其他操作造成任何影响
                  param.row.validearlyWarnDays 
                )
              ]
            );
          }
        }
      ],
      fixedList:[],
      noFixedList:[],
      fixedListCopy:[],
      noFixedListCopy:[],
      lightenDate:[]
    };
  },
  created() {
  },
  mounted() {
    
  },
  destroyed() {},
  computed: {},
  methods: {
    init() {
    },
    //新增操作
    save() {    
      let params = this.fixedList.concat(this.noFixedList);
      let flag = true;
      for(let u of params){
        //如果表格单元格有提示语的话，就无法进行保存操作（表单验证效果）
        if(!!u.validDaysF || !!u.validDaysT || !!u.validearlyWarnDays){
          flag = false;
          break;
        }
      }
      if(flag == false){
        return ; 
      }
      if(!this.lightenDate[0] || !this.lightenDate[1]){
        this.$Message.warning({
          content: "请选择点亮时间",
          duration: 10,
          closable: true
        });
        return ;
      }
      for(let u of params){
        u.lightenDateF = this.lightenDate[0];
        u.lightenDateT = this.lightenDate[1];
      }
      
    },
    // 重置
    reset() {
      this.fixedList = [].concat(this.fixedListCopy);
      this.noFixedList = [].concat(this.noFixedListCopy);
    }
  },
  watch: {}
};
</script>
<style lang="" scoped>
    
</style>
