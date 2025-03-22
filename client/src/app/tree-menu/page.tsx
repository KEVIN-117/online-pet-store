import TreeMenu from '@/components/core/TreeMenu'
import { treeData } from '@/components/core/TreeMenu/types'
import React from 'react'

function TreeMenuPage() {
    return <TreeMenu treeData={treeData} />
}

export default TreeMenuPage