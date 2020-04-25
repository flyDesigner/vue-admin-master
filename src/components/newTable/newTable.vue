<template>
  <table id="newTable">
    <colgroup>
      <col v-for="(column, index) in columns" :key="index" :width="setCellWidth(column)" />
    </colgroup>
    <thead>
      <tr>
        <th v-for="item in columns" :key="item">
            <template v-if="item.type === 'selection'">
              <Checkbox v-model="isSelectAll"  @on-change="selectAll"></Checkbox>
          </template>
          <template v-if="!item.type">
              <span >{{ item.label }}</span>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item">
        <td v-for="column in columns" :key="column">
          <template v-if="column.type === 'index'"><span>{{ item._index + 1 }}</span></template>
          <template v-if="column.type === 'selection'">
              <Checkbox v-model="item._isChecked" @click.native.stop="handleClick" @on-change="toggleSelect" ></Checkbox>
          </template>
          <template v-if="!column.type">
              <span >{{ item[column.key] }}</span>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "NewTable",
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
  data() {
    return {
      tableData: [],
      isSelectAll:false
    };
  },
  created() {},
  mounted() {
    this.tableData = this.makeObjData();
  },
  destroyed() {},
  computed: {
  },
  methods: {
    handleClick() {

    },
    toggleSelect() {
      debugger
    },
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
          data[index] = newRow;
      });
      return data;
    },
    // deepCopy
    deepCopy(data) {
        const t = typeOf(data);
        let o;
        if (t === 'array') {
            o = [];
        } else if ( t === 'object') {
            o = {};
        } else {
            return data;
        }

        if (t === 'array') {
            for (let i = 0; i < data.length; i++) {
                o.push(deepCopy(data[i]));
            }
        } else if ( t === 'object') {
            for (let i in data) {
                o[i] = deepCopy(data[i]);
            }
        }
        return o;
    },
    selectAll () {
      for(let data of this.tableData){
        data._isChecked = this.isSelectAll;
      }
    },
    getSelectData() {
      let data = [];
      this.tableData.forEach((row,index) => {
        if(row._isChecked == true){
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
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#newTable  td {
  background-color: #f9f9f9;
}

#newTable th, td {
  text-align: center;
  padding: 10px 20px;
}

#newTable  th.active {
  color: #fff;
}
</style>