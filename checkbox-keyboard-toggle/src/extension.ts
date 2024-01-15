// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

interface Element {
  label: string;
  checked?: vscode.TreeItemCheckboxState;
  children: Element[];
}

const root: Element = {
  label: "root",
  checked: vscode.TreeItemCheckboxState.Unchecked,
  children: [
    {
      label: "first",
      children: [],
    },
    {
      label: "second",
      checked: vscode.TreeItemCheckboxState.Unchecked,
      children: [],
    },
    {
      label: "third",
      checked: vscode.TreeItemCheckboxState.Unchecked,
      children: [  {
		label: "third.first",
		checked: vscode.TreeItemCheckboxState.Unchecked,
		children: [],
	  },
	  {
		label: "third.second",
		children: [],
	  },
	  {
		label: "third.third",
		checked: vscode.TreeItemCheckboxState.Unchecked,
		children: [],
	  },],
    },
  ],
};

export class TreeProvider implements vscode.TreeDataProvider<Element> {
  constructor() {}

  getTreeItem(element: Element): vscode.TreeItem {
    return {
      label: element.label,
      checkboxState: element.checked,
      collapsibleState: element.children.length
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None,
    };
  }

  getChildren(parent?: Element): vscode.ProviderResult<Element[]> {
    if (!parent) {
      return [root];
    }

    return parent.children;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "checkbox-keyboard-toggle" is now active!'
  );

  vscode.window.registerTreeDataProvider(
    "checkbox-keyboard-toggle:treeview",
    new TreeProvider()
  );
}

export function deactivate() {}
