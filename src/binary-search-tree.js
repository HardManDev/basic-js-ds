const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    /**
     * @type {Node}
     */
    this._tree = null
  }

  root() {
    return this._tree
  }

  add(data) {
    const resolveAdd = (tree, data) => {
      if (tree.data > data) {
        if (tree.left === null)
          tree.left = new Node(data)
        else
          resolveAdd(tree.left, data)
      } else {
        if (tree.right === null)
          tree.right = new Node(data)
        else
          resolveAdd(tree.right, data)
      }
    }

    if (this._tree === null) {
      this._tree = new Node(data)
      return;
    }

    resolveAdd(this._tree, data)
  }

  has(data) {
    return this.find(data) !== null
  }

  find(data, withParent = false) {
    let parent = null

    const resolveFind = (tree, data) => {
      if (tree === null)
        return null

      if (tree.data === data) {
        return tree
      }

      parent = tree

      return tree.data >= data
          ? resolveFind(tree.left, data)
          : resolveFind(tree.right, data)
    }

    return !withParent
        ? resolveFind(this._tree, data)
        : {
          node: resolveFind(this._tree, data),
          parent: parent
        }
  }

  remove(data) {
    let parent = this._tree

    const resolveRemove = (tree, data) => {
      if (tree.data === data) {
        let parentSide = parent.left?.data === tree.data ? 'left': 'right'

        if (tree.left === null && tree.right === null) {
          parent[parentSide] = null
          return
        }

        if (tree.left !== null && tree.right === null) {
          parent[parentSide] = tree.left
          return
        }
        if (tree.right !== null && tree.left === null) {
          parent[parentSide] = tree.right
          return
        }

        if(tree.left !== null && tree.right !== null) {
          const _ = this.max(tree.left)

          this.remove(_)

          tree.data = _
          return
        }
      }

      parent = tree
      return tree.data >= data
          ? resolveRemove(tree.left, data)
          : resolveRemove(tree.right, data)
    }

    resolveRemove(this._tree, data)
  }

  min(tree = this._tree) {
    let min = tree

    const resolveMin = (_tree) => {
      if (_tree.data < min.data) {
        min = _tree
      }

      if (_tree.left === null && _tree.right === null) {
        return min
      }

      return resolveMin(_tree.left !== null ? _tree.left : _tree.right)
    }

    return resolveMin(tree).data
  }

  max(tree = this._tree) {
    let max = tree

    const resolveMax = (_tree) => {
      if (_tree.data > max.data)
        max = _tree

      if (_tree.left === null && _tree.right === null) {
        return max
      }

      return resolveMax(_tree.right !== null ? _tree.right : _tree.left)
    }

    return resolveMax(tree).data
  }
}

module.exports = {
  BinarySearchTree
};