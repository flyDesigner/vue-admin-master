# CommonDevKnowledge

## 介绍
这是一个自定义的table组件，主要实现了单选高亮、ctrl+单击多选、shift+鼠标拖拽多选的功能

## 参数
> ### 1、表头columns：
key   对应列内容的字段名
label 列头显示的名称
width 列宽
> ### 2、显示的结构化数据data,每一行的数据来源，可设置_isHighlight属性控制初始高亮


## 内容

> ### 1、单选高亮和ctrl单击高亮
对表格数据进行预处理，深度拷贝一个tableData来代替data进行数据绑定，并且对data数组的每个对象添加高亮属性_isHighlight,
表格单行数据的高亮根据该属性来控制。
对单行tr绑定单击监听事件，判断为单击还是ctrl单击,使用for循环修改data中的高亮属性
```
for(let data of this.tableData){
    if(data._index == item._index){
    data._isHighlight = true;
    }
}
```



> ### 2、shift+鼠标拖拽多选
使用全局变量shiftSelectStart和startIndex来记录是否在拖拽过程中和第一次鼠标按下的数据下标，通过鼠标按下事件mousedown、
鼠标移动事件mousemove、鼠标弹起事件mouseup来鼠标拖拽过程。
最后在鼠标弹起事件中修改选中行的高亮属性，注意在移动事件中阻止浏览器的默认shift+左键事件



----
