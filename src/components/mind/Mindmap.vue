<template>
  <div>
     <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="在这里对内容进行编辑"
          v-model="updateContent.val"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="updateTreeNode">确认修改节点内容</el-button>
      </el-col>
    </el-row>

    <div class="mytree">
      <el-tree
        :indent="0"
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        draggable

        :filter-node-method="filterNode"
        ref="tree"
      >
       <!-- 
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop" -->
        <span class="custom-tree-node" slot-scope="{ node, data }">
          {{data.label!==''?data.label:"空"}}
          <el-button type="text" size="mini" @click="() => append(data)" style="font-size: 20px;">+</el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
            style="font-size: 20px;"
          >-</el-button>

          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(data)"></el-button>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      updateContent: {
        val:"",
        id:-1
      },
      filterText: "",
      data: [
        {
          id: 1,
          label: "思维导图",
          children: [
            {
              label: "学习大纲",
              id: 2,
              children: [
                {
                  id: 3,
                  label: "Python",
                },
                {
                  id: 4,
                  label: "Java",
                },
                 {
                  id: 5,
                  label: "Cpp",
                },
              ],
            },
          ],
          editable: false,
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    traverseTree(node) {
      console.log("Node ID:", node.id);
      console.log("Node Label:", node.label);
      if(this.updateContent.id == node.id){
        console.log("该节点是：");
        node.label=this.updateContent.val
        return 
      }
      if (node.children && node.children.length > 0) {
        console.log("Children:");
        node.children.forEach((child) => {
          this.traverseTree(child);
        });
      }
    },
    updateTreeNode(){
      this.traverseTree(this.data[0])
      this.updateContent.val=''
      this.updateContent.id=-1
    },
    handleEdit(data) {
      this.updateContent.val = data.label;
      this.updateContent.id = data.id
      console.log(data.id,'==>该节点的id');
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      data.editable = true;
      console.log(data, "==>data");
      console.log(node, "==>node");
    },
    append(data) {
      console.log("增加节点");
      const newChild = { id: id++, label: "", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
   
    handleBlur(data, event) {
      // 检查点击的目标元素是否在输入框内部，如果不是，则禁止编辑
      const target = event.relatedTarget || document.activeElement;
      if (!target || !target.contains(event.target)) {
        data.editable = false;
        console.log(data.editable, "==>editable");
      }
    },
    handleTextareaFocus(event) {
      // 获取焦点时的处理逻辑，可以根据需要进行调整
    },
    handleTextareaBlur(event) {
      // 失去焦点时的处理逻辑，可以根据需要进行调整
    },
    calculateTextareaRows(text) {
      // 根据文本内容计算行数，以适应输入框的高度
      const lines = text.split("\n");
      return Math.max(lines.length, 1);
    },
  },
};
</script>

<style lang="scss" >
.mytree {
  .el-tree-node {
    position: relative;
    padding-left: 32px;
  }
  .el-tree-node__children {
    padding-left: 16px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-left: 1px dashed #1389bc;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-top: 1px dashed #1389bc;
    height: 20px;
    top: 12px;
    width: 18px;
  }
  .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-tree .el-icon-caret-right:before {
    content: "\e723";
    font-size: 16px;
    color: #1389bc;
    position: absolute;
    left: -20px;
    top: -8px;
  }
  .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: "\e722";
    font-size: 16px;
    color: #1389bc;
    position: absolute;
    left: -20px;
    top: -8px;
  }
  .el-tree-node__expand-icon.is-leaf:before {
    content: "\e722";
    font-size: 16px;
    color: #1389bc;
    position: absolute;
    left: -20px;
    top: -8px;
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0;
  }
}
</style>


 <!-- <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="data.label"
          >
        </el-input> -->

  <!-- <span>{{ node.label }}</span> -->
        <!-- 显示编辑框 -->
        <!-- <el-input
           v-if="data.editable"
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          v-model="data.label"
           @blur="handleBlur(data, $event)">
        </el-input> -->
