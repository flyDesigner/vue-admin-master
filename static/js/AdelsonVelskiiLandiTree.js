
// 这是一个自平衡二叉树实现类
function AdelsonVelskiiLandiTree() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    var root = null;
    var heightNode = function (node) {
        if (node == null) {
            return -1;
        } else {
            return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
        }
    }
    // 自平衡插入数据
    var insertNode = function (node, element) {
        if (node === null) {
            node = new Node(element);
        } else if (element < node.key) {
            node.left = insertNode(node.left, element);
            if (node.left !== null) {
                // 确认是否需要平衡 {1}
                if ((heightNode(node.left) - heightNode(node.right)) > 1) {
                    // 旋转 {3}
                    if (element < node.left.key) {
                        node = rotationLL(node);
                    } else {
                        node = rotationLR(node);
                    }
                }
            }
        } else if (element > node.key) {
            node.right = insertNode(node.right, element);
            if (node.right !== null) {
                // 确认是否需要平衡 {2}
                if ((heightNode(node.right) - heightNode(node.left)) > 1) {
                    // 旋转 {3}
                    if (element > node.right.key) {
                        node = rotationRR(node);
                    } else {
                        node = rotationRL(node);
                    }
                }
            }
        }
        return node;
    };
    // 前序遍历二叉树
    var PreOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            PreOrderTraverseNode(node.left, callback);
            PreOrderTraverseNode(node.right, callback);
        }
    }
    // 中序遍历二叉树
    var InOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            InOrderTraverseNode(node.left, callback);
            callback(node.key);
            InOrderTraverseNode(node.right, callback);
        }
    }
    // 后序遍历二叉树
    var PostOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            PostOrderTraverseNode(node.left, callback);
            PostOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    var removeNode = function (node, key) {
        if (node == null) {
            return null;
        }
        if (key < node.key) {
            node.left = removeNode(node.left, key);
            console.log(node)
            return node;
        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
            console.log(node)
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // 删除有两个子节点的节点的时候，先找到该节点右侧子树中最小的节点值
            var aux = findMinNode(node.right);
            // 将找到的最小值代替要删除的节点值，然后删除有最小值的节点
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key)
            return node;
        }
    }
    // 查找节点下面最小的节点的key值
    var findMinNode = function (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }
    var printNode = function (value) {
        console.log(value);
    }


    this.insert = function (key) {
        let newNode = new Node(key);
        if (root == null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    }
    // 移除一个树节点
    this.remove = function (key) {
        root = removeNode(root, key);
    }
    this.preOrderTraverse = function () {
        PreOrderTraverseNode(root, printNode);
    }
    this.inOrderTraverse = function () {
        InOrderTraverseNode(root, printNode);
    }
    this.postOrderTraverse = function () {
        PostOrderTraverseNode(root, printNode);
    }
}

newtree.insert(11)
newtree.insert(7);
newtree.insert(15);
newtree.insert(5);
newtree.insert(3);
newtree.insert(9);
newtree.insert(8);
newtree.insert(10);
newtree.insert(13);
newtree.insert(12);
newtree.insert(14);
newtree.insert(20);
newtree.insert(18);
newtree.insert(25);
export default AdelsonVelskiiLandiTree;