'use babel';

import TreeViewNgView from './tree-view-ng-view';
import { CompositeDisposable } from 'atom';

export default {

  treeViewNgView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.treeViewNgView = new TreeViewNgView(state.treeViewNgViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.treeViewNgView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tree-view-ng:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.treeViewNgView.destroy();
  },

  serialize() {
    return {
      treeViewNgViewState: this.treeViewNgView.serialize()
    };
  },

  toggle() {
    console.log('TreeViewNg was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
