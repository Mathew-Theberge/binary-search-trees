class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = mergeSort(removeDuplicates(arr));
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (node.data === value) {
      console.log("value already in tree");
      return node;
    }

    if (value > node.data) {
      node.right = this.insert(value, node.right);
    } else {
      node.left = this.insert(value, node.left);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let closestNode = this.findMin(node);
      node.data = closestNode.data;
      node.right = this.deleteItem(closestNode.data, node.right);
    }
    return node;
  }

  findMin(node) {
    let closestRightNode = node.right;
    while (closestRightNode.left !== null) {
      closestRightNode = closestRightNode.left;
    }
    return closestRightNode;
  }

  find(value, node = this.root) {
    if (node === null) return;
    let currNode = node;

    while (currNode.left !== null || currNode.right !== null) {
      if (value > currNode.data) {
        currNode = currNode.right;
      } else if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        return currNode;
      }
    }
    // leaf nodes dont get checked with the while loop code
    // so we do a final check for equality before returning null
    if (currNode.data === value) {
      return currNode;
    } else return null;
  }
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  let leftArray = arr.slice(0, mid);
  let rightArray = arr.slice(mid);

  leftArray = mergeSort(leftArray);
  rightArray = mergeSort(rightArray);

  return merge(leftArray, rightArray);
}

function merge(left, right) {
  let sortedArray = [];
  let i = 0;
  let j = 0;

  while (left.length > i && right.length > j) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else {
      sortedArray.push(right[j]);
      j++;
    }
  }

  return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [1, 2, 3, 5, 6];

const tree = new Tree(arr);

// tree.insert(25);
// tree.insert(26);
// tree.insert(25);
// tree.insert(27);
// tree.insert(4);
// tree.insert(4);
// tree.insert(4);
// tree.insert(3);
// tree.insert(240);
// tree.insert(235);

tree.deleteItem(31);

console.log(tree.find(1));
// console.log(tree.root);
// prettyPrint(tree.root);
