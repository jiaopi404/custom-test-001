/**

class TreeNode {
  int val;
  TreeNode left, right;
}
void traverse(TreeNode root) {
  // 前序遍历代码位置
  traverse(root.left);
  // 中序遍历代码位置
  traverse(root.right);
  // 后序遍历代码位置
}
 */

let res = -Infinity;
/**
 * 
 * @param {*} root 
 * @returns {number}
 */
const oneSideMax = (root) => {
  if (root === null) return 0;

  // 前序
  const left = oneSideMax(root.left);
  // 中序
  const right = oneSideMax(root.right);

  res = Math.max(res, left + right + root.val);

  // 后序
  return Math.max(left, right) + root.val;
};
