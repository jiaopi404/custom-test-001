/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k) {
   let res = 0;

   let rank = 0;
   const traverse = (root) => {
     if (root == null) {
       return 0;
     }
     // 前
     traverse(root.left);
     // 中
     rank++
     if (rank === k) {
       res = root.val;
       return;
     }
     traverse(root.right);
     // 后
   }

   traverse(root);

   return res;
};