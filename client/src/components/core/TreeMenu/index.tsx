import { TreeNode } from "./TreeNode";
import type { TreeItem } from "./types";

export default function TreeMenu({ treeData, level = 0 }: { treeData: TreeItem[], level?: number }) {
    return (
        <ul>
            {treeData.map((item, index) => (
                <TreeNode key={index} treeData={item} level={level} />
            ))}
        </ul>
    );
}