import { Tree, prettyPrint } from "./bst.js";

function randomArray() {
  let randomArray = [];
  for (let i = 0; i < 100; i++) {
    let number = Math.floor(Math.random() * 100) + 1;
    randomArray.push(number);
  }
  return randomArray;
}

let array = randomArray();

const tree = new Tree(array);

console.log(tree.isBalanced());
console.log(tree.levelOrder((node) => console.log(node.data)));
console.log(tree.preorder((node) => console.log(node.data)));
console.log(tree.inorder((node) => console.log(node.data)));
console.log(tree.postorder((node) => console.log(node.data)));
tree.insert(101);
tree.insert(124);
tree.insert(243);
tree.insert(768);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder((node) => console.log(node.data)));
console.log(tree.preorder((node) => console.log(node.data)));
console.log(tree.inorder((node) => console.log(node.data)));
console.log(tree.postorder((node) => console.log(node.data)));
