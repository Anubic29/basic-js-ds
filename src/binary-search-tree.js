const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class TreeNode {
  constructor (data) {
    this.data = data
    this.left = this.right = null
  }
}

class BinarySearchTree {
  constructor () {
    this.rootNode = null
  }

  root () {
    return this.rootNode
  }

  add (data) {
    if (this.rootNode === null) {
      this.rootNode = new TreeNode(data)
      return
    }
    const [parent, path] = (function search(data, currNode) {
      let res = currNode
      let path
      if (data < res.data) {
        path = 'left'
      } else {
        path = 'right'
      }
      if (res[path] !== undefined && res[path] !== null) {
        [res, path] = search(data, res[path])
      }
      return [res, path]
    })(data, this.root())
    parent[path] = new TreeNode(data)
  }

  has (data) {
    if (this.find(data) !== null) return true
    return false
  }

  find(data) {
    return (function search(data, currNode) {
      let res = currNode
      let path
      if (data < res.data) {
        path = 'left'
      } else if (data > res.data) {
        path = 'right'
      } else {
        return res
      }
      if (res[path] !== null) {
        res = search(data, res[path])
      } else {
        return null
      }
      return res
    })(data, this.root())
  }

  remove(data) {
    if (this.has(data)) {
      let node = this.find(data)
      if (node !== this.root()) {
        let [parent, path] = (function search(node, currNode) {
          let res = currNode
          let path = node.data < res.data ? 'left' : 'right'
          if (res[path].data !== node.data) {
            [res, path] = search(node, res[path])
          }
          return [res, path]
        })(node, this.root())
        if (node.left === null && node.right === null) {
          parent[path] = null
        } else if (node.left !== null && node.right === null) {
          parent[path] = node.left
        } else if (node.left === null && node.right !== null) {
          parent[path] = node.right
        } else {
          let subParent = node, subNode = node.left
          while (subNode.right !== null) {
            subParent = subNode
            subNode = subNode.right 
          }
          parent[path] = subNode
          subNode.right = node.right
          if (subNode !== node.left) {
            let temp = subNode.left
            subNode.left = node.left
            subParent.right = temp
          }
        }
      } else {
        if (node.left === null && node.right === null) {
          this.rootNode = null
        } else if (node.left !== null && node.right === null) {
          this.rootNode = node.left
        } else if (node.left === null && node.right !== null) {
          this.rootNode = node.right
        } else {
          let subParent = node, subNode = node.left
          while (subNode.right !== null) {
            subParent = subNode
            subNode = subNode.right 
          }
          this.rootNode = subNode
          subNode.right = node.right
          if (subNode !== node.left) {
            let temp = subNode.left
            subNode.left = node.left
            subParent.right = temp
          }
        }
      }
    }
  }

  min() {
    if (this.root() === null) return null
    return (function search(currNode) {
      let res = currNode
      if (res.left === null) return res
      else res = search(res.left)
      return res
    })(this.root()).data
  }

  max() {
    if (this.root() === null) return null
    return (function search(currNode) {
      let res = currNode
      if (res.right === null) return res
      else res = search(res.right)
      return res
    })(this.root()).data
  }
}

module.exports = {
  BinarySearchTree
};