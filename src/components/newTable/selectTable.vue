<template>
  <table id="newTable">
    <colgroup>
      <col v-for="(column, index) in columns" :key="index" :width="setCellWidth(column)" />
    </colgroup>
    <thead>
      <tr>
        <th v-for="item in columns" :key="item">
          <span >{{ !!item.label ? item.label : "" }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item"  :class="rowClasses(item)" @mousedown="selectStart(item,$event)"
       @mousemove="shiftSelect($event)" @mouseup="selectEnd(item,$event)" @click="clickCurrentRow(item,$event)">
        <td v-for="column in columns" :key="column">
          <span >{{ item[column.key] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "SelectTable",
  components: {},
  props: {
    columns: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    }
  },
  directives:{
  },
  data() {
    return {
      tableData: [],
      // 标识符，标识着按下shift进行多选
      shiftSelectStart:false,
      startIndex:-1
    };
  },
  created() {},
  mounted() {
    this.tableData = this.makeObjData();
    let that = this;
  },
  destroyed() {},
  computed: {
  },
  methods: {
    // 单击行数据，如果是普通单击，单行高亮，其他行失效，如果是ctrl单击，那么单行高亮
    clickCurrentRow(item,e) {
      if(e.ctrlKey == true){
        for(let data of this.tableData){
          if(data._index == item._index){
            data._isHighlight = true;
          }
        }
      }else{
        this.clearCurrentRow();
        for(let data of this.tableData){
          if(data._index == item._index){
            data._isHighlight = true;
          }
        }
      } 
    },
    // 清除已有的高亮行的高亮
    clearCurrentRow() {
      for(let data of this.tableData){
          data._isHighlight = false;
      }
    },
    // 鼠标按下的事件，获取第一个shift选中的数据下标
    selectStart(item,e) {
      if(e.shiftKey == true){
        this.shiftSelectStart = true;
        this.startIndex = item._index;
        e.preventDefault();
        this.clearCurrentRow();
      }
    },
    // 处于shift加鼠标按下拖动时，阻止默认事件
    shiftSelect(e) {
      if(this.shiftSelectStart == true){
        e.preventDefault();
      }
    },
    // 两层判断，如果是shift鼠标拖动过程，鼠标弹起会触发该事件，获取需要高亮行下标范围
    selectEnd(item,e) {debugger
      if(this.shiftSelectStart == true){
        this.shiftSelectStart = false;
        var endIndex = Math.max(this.startIndex,item._index);
        var startIndex = Math.min(this.startIndex,item._index);
        for(let data of this.tableData){
          if(data._index <= endIndex && data._index >= startIndex){
            data._isHighlight = true;
          }
        }
      }
      this.startIndex = -1;
    },
    // 控制单元行是否高亮
    rowClasses (item) {
      if(item._isHighlight){
        return [`highlight`];
      }else{
        return [];
      } 
    },
    // 根据data中的width属性设置单元列宽度
    setCellWidth(column) {
      let width = "";
      if (column.width) {
        width = column.width;
      } else {
        width = "120px";
      }
      if (width === "0") width = "";
      return width;
    },
    // 对表格数据预处理
    makeObjData () {
      let data = [];
      this.data.forEach((row, index) => {
          // const newRow = deepCopy(row);// todo 直接替换
          const newRow = JSON.parse(JSON.stringify(row));
          newRow._index = index;
          if (newRow._disabled) {
              newRow._isDisabled = newRow._disabled;
          } else {
              newRow._isDisabled = false;
          }
          if (newRow._checked) {
              newRow._isChecked = newRow._checked;
          } else {
              newRow._isChecked = false;
          }
          if (newRow._highlight) {
              newRow._isHighlight = newRow._highlight;
          } else {
              newRow._isHighlight = false;
          }
          data[index] = newRow;
      });
      return data;
    },
    // 获取所有高亮选中数据
    getSelectData() {
      let data = [];
      this.tableData.forEach((row,index) => {
        if(row._isHighlight == true){
          data.push(this.data[index]);
        }
      })
      return data;
    }
  },
  watch: {
    data: {
      handler() {
        this.tableData = this.makeObjData();
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

#newTable  table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

#newTable  th {
  background-color: #f8f8f9;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#newTable  td {
  background-color: #fff;
}

#newTable th, td {
  text-align: center;
  padding: 10px 20px;
}

#newTable .highlight td {
  background-color: #ebf7ff;
}
</style>