class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(data, node = this.root) {
    if (!this.root) {
      this.root = new Node(data);
      return;
    }
    if (node === null) return new Node(data);
    if (data < node.data) node.left = this.insert(data, node.left);
    else if (data > node.data) node.right = this.insert(data, node.right);
    return node;
  }
  findMin(node = this.root) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  findMax(node = this.root) {
    let current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  find(data, node = this.root) {
    if (node === null) return null;
    else if (data < node.data) return this.find(data, node.left);
    else if (data > node.data) return this.find(data, node.right);
    else return node;
  }
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  remove(data, node = this.root) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      // node has no children
      if (node.left == null && node.right == null) {
        return null;
      }
      // node has no left child
      if (node.left == null) {
        return node.right;
      }
      // node has no right child
      if (node.right == null) {
        return node.left;
      }
      // node has two children - 오른쪽 트리중 가장 낮은 것을 뽑는다.
      node.data = this.findMin(node.right);
      node.right = this.remove(node.data, node.right);
      return node;
    } else if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else {
      node.right = this.remove(data, node.right);
      return node;
    }
  }
  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }
  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  inOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    }
  }
  postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      }
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder() {
    let result = [];
    let Q = [];
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.data);
        if (node.left != null) {
          Q.push(node.left);
        }
        if (node.right != null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }
}

const a = new BST();
a.insert(3);
a.insert(1);
a.insert(5);
a.insert(2);
a.insert(4);
a.insert(9);
a.insert(7);
a.insert(11);
a.insert(6);
a.insert(8);
a.insert(10);
a.insert(12);
console.log(a.preOrder())
a.remove(9) 
console.log(a.preOrder())
