

 //Definition for a binary tree node.
//  function TreeNode(val, left, right) {
//     this.val = (val===undefined ? 0 : val)
//     this.left = (left===undefined ? null : left)
//     this.right = (right===undefined ? null : right)
//  }
 
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// var depthFirst = function (node) {
//     if (node) {
//       console.log(node.data);
//       depthFirst(node.left);
//       depthFirst(node.right);
//     }
//   };

// var increasingBST = function(root){
//     let newRoot = null, newTree = null;
//     let stack = [];

//     while(root){
//         //left leaf
//         while(root){
//             stack.push(root);
//             root = root.left;
//         }
//         while(stack.length > 0){
//             let node = stack.pop();
//             if(!newRoot){
//                 newRoot = newTree = node;
//             }else{
//                 newTree.right = node;
//                 newTree = newTree.right;
//             }
//             node.left = null;
//             if(node.right){
//                 root = node.right;
//                 break;
//             }
//         }


//     }
// }

var increasingBST = function(root){

    //왼쪽 서브트리 - 루트 - 오른쪽 서브트리 
    let newTree = null;
    let newRoot = null;
    let stack = [];
    while(root){
        while(root){
            stack.push(root);
            root = root.left;
        }
        while(stack.length > 0){
            let node = stack.pop();

            if(!newRoot){
                newRoot = node;
                newTree = node;
            }else{
                newTree.right = node;
                newTree = newTree.right;
            }

            node.left = null;

            if(node.right){
                root = node.right;
                break;
            }
        }
    }

    return newRoot;

}


//Maximum Depth of N-ary Tree
var maxDepth = function(root){
    let max = 0;
    
    const search = (children,count) => {
        for(let i=0;i<children.length;i++){
            const child = children[i];

            search(child.children, count+1);
        }

        max = max < count ? count : max;

        return max;
    }

    return search(root.children,1);

}
