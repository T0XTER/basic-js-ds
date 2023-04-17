const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
const pos = {
  right: 'right',
  left: 'left'
};

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      const insertPos = data < node.data ? pos.left : pos.right;

      node[insertPos] = addNode(node[insertPos], data);

      return node;
    }
  }

  has(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      const findPos = data < node.data ? pos.left : pos.right;

      return findNode(node[findPos], data);
    }
  }

  find(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      const findPos = data < node.data ? pos.left : pos.right;

      return findNode(node[findPos], data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);

        return node;
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data);

        return node;
      }

      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        node = node.right;

        return node;
      }

      if (!node.right) {
        node = node.left;

        return node;
      }

      let minFromRight = node.right;

      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }

      node.data = minFromRight.data;

      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    if (!this.root()) {
      return null;
    }

    let minNode = this.root();

    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  max() {
    if (!this.root()) {
      return null;
    }

    let maxNode = this.root();

    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};