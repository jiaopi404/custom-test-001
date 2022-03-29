/**
基本的二叉树节点
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