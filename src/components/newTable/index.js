const tableData = [{
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}]

function getTopAndBottom(row, bottom, top) {
    let n = row.rowIndex,
        mx = bottom.rowIndex,
        mi = top.rowIndex;
    if (n > mx) {
        return {
            top: mi,
            bottom: n
        };
    } else if (n < mx && n > mi) {
        return {
            top: mi,
            bottom: n
        };
    } else if (n < mi) {
        return {
            top: n,
            bottom: mx
        };
    } else if (n == mi || n == mx) {
        return {
            top: mi,
            bottom: mx
        };
    }
};

var options = {
    data() {
        return {
            tableData: tableData,
            multipleSelection: [],
            selectionRow: []
        }
    },
    computed: {
        bottomSelectionRow() {
            if (this.selectionRow.length == 0) return null;
            return this.selectionRow.reduce((start, end) => {
                return start.rowIndex > end.rowIndex ? start : end;
            });
        },
        topSelectionRow() {
            if (this.selectionRow.length == 0) return null;
            return this.selectionRow.reduce((start, end) => {
                return start.rowIndex < end.rowIndex ? start : end;
            });
        }
    },
    methods: {
        rowClick(row, column, event) {
            let refsElTable = this.$refs.multipleTable;
            if (this.CtrlDown) {
                refsElTable.toggleRowSelection(row);
                return;
            }
            if (
                this.shiftOrAltDown &&
                this.selectionRow.length > 0
            ) {
                let topAndBottom = getTopAndBottom(
                    row,
                    this.bottomSelectionRow,
                    this.topSelectionRow
                );
                 refsElTable.clearSelection();
                for (let index = topAndBottom.top; index <= topAndBottom.bottom; index++) {
                    refsElTable.toggleRowSelection(this.tableData[index], true);
                }
            } else {
                let findRow = this.selectionRow.find(c => c.rowIndex == row.rowIndex);
                if (findRow && this.selectionRow.length == 1) {
                    refsElTable.toggleRowSelection(row, false);
                    return;
                }
                refsElTable.clearSelection();
                refsElTable.toggleRowSelection(row);
            }
        },
        rowStyle({
            row,
            rowIndex
        }) {
            Object.defineProperty(row, 'rowIndex', {
                value: rowIndex,
                writable: true,
                enumerable: false
            })
        },
        rowClassName({
            row,
            rowIndex
        }) {
            let rowName = "",
                findRow = this.selectionRow.find(c => c.rowIndex === row.rowIndex);
            if (findRow) {
                rowName = "current-row ";
            }
            return rowName;
        },
        handleSelectionChange(val) {
            this.selectionRow = val
        },
        keyDown(event) {
            let key = event.keyCode;
            if (key == 17) this.CtrlDown = true;
            if (key == 16 || key == 18) this.shiftOrAltDown = true;
        },
        keyUp(event) {
            let key = event.keyCode;
            if (key == 17) this.CtrlDown = false;
            if (key == 16 || key == 18) this.shiftOrAltDown = false;
        },
    },
    mounted() {
        window.addEventListener("keydown", this.keyDown, false);
        window.addEventListener("keyup", this.keyUp, false);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("keyup", this.keyUp);
    }
}
new Vue(options).$mount('#app')