// 类型
type MyTree = {
    id: number
    name: string
    children?: Array<MyTree>
}

const myTree: MyTree = {
    id: 11,
    name: '111',
    children: [
        {
            id: 112,
            name: 'sdfs'
        }
    ]
}
