import React, { useEffect, useState } from "react";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import { Tree } from "antd";
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
const updateTreeData = (
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const FileList = () => {
  const [dirTreeData, setDirTreeData] = useState([]);
  const [currentFileContent, setCurrentFileContent] = useState("");
  // 选择文件夹
  const selectDir = async () => {
    try {
      const rootHandel = await window.showDirectoryPicker({
        startIn: "desktop",
      });
      const rootTreeNode = createTreeNode(
        rootHandel,
        rootHandel.kind,
        rootHandel.name,
        "/" + rootHandel.name
      );
      // 构建所有的节点
      // rootTreeNode.children = await setDirTree(rootHandel, "/" + rootHandel.name);
      // console.log(rootTreeNode);
      // 添加到根节点下
      setDirTreeData([rootTreeNode]);
    } catch (err) {
      console.log(err);
    }
  };
  // 这里生成一个根节点
  const createTreeNode = (
    handle: FileSystem,
    kind: string,
    name: string,
    key: React.key,
    file = null
  ) => {
    const res = {
      handle,
      title: name,
      kind,
      file,
      icon:
        kind === "directory" ? (
          <FolderOutlined style={{ color: "#d686ff" }} />
        ) : (
          <FileOutlined style={{ color: "#79d7dc" }} />
        ),
      key,
      isLeaf: kind !== "directory",
    };
    // if (kind === "directory") {
    //   res.children = [];
    //   res.isLeaf = false;
    // }
    return res;
  };

  // 获取子节点
  const setDirTree = async (rootHandel: any, parentKey: any) => {
    const currentRankFiles = [];
    let index = 0;
    // 遍历得到子句柄
    for await (let currentHandel of rootHandel) {
      console.log(currentHandel);
      const handelEle = currentHandel[1];
      console.log(handelEle);
      // 以文件路径作为 key
      const uniqueKey = parentKey + "/" + handelEle.name;
      currentRankFiles.push(
        createTreeNode(
          handelEle,
          handelEle.kind,
          handelEle.name,
          uniqueKey,
          handelEle.kind === "file" ? await handelEle.getFile() : null
        )
      );
      // if (handelEle.kind === "directory") {
      //   // 递归构建节点树
      //   currentRankFiles[index].children = await setDirTree(
      //     handelEle,
      //     uniqueKey
      //   );
      // }
      // index++;
    }
    // 按照文件夹在前，文件在后排序
    currentRankFiles.sort((a, b) => {
      if (a.kind === "directory" && b.kind === "file") {
        return -1;
      }
      if (a.kind === "file" && b.kind === "directory") {
        return 1;
      }
      return 0;
    });

    return currentRankFiles;
  };
  // 选择文件
  const onSelect = (selectedKeys: any, info: any) => {
    // console.log("onselect", selectedKeys, info);
    if (info.node.file) {
      //   读文件内容
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader, "文件内容");
        setCurrentFileContent(reader.result);
      };
      reader.readAsText(info.node.file);
    }
  };
  const onLoadData = ({ children, key, handle }) =>
    new Promise((resolve) => {
      console.log(handle);
      if (children) {
        resolve("");
        return;
      }
      setDirTree(handle, key).then((res) => {
        console.log("return data:", res);
        setDirTreeData((origin) => updateTreeData(origin, key, res));
        resolve("");
      });

      // setTimeout(() => {
      //   setTreeData((origin) =>
      //     updateTreeData(origin, key, [
      //       {
      //         title: "Child Node",
      //         key: `${key}-0`,
      //       },
      //       {
      //         title: "Child Node",
      //         key: `${key}-1`,
      //       },
      //     ])
      //   );
      //   resolve();
      // }, 1000);
    });

  return (
    <div class="size-2/5 ">
      <div onClick={selectDir}>
        <FolderOutlined /> 文件夹
      </div>
      <div className="ide-content">
        <div className="filesList">
          <Tree
            autoExpandParent={true}
            showLine={false}
            showIcon={true}
            onSelect={onSelect}
            treeData={dirTreeData}
            loadData={onLoadData}
          />
        </div>
      </div>
    </div>
  );
};

export default FileList;
