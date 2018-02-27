'use babel';

export default class TreeViewNgView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tree-view-ng');

    // Create message element

    this.getRepositories().then(repos => {
        for (const repo of repos) {
          console.log(repo);
        });

      const message = document.createElement('div'); message.textContent = 'The TreeViewNg package is Alive! It\'s ALIVE!'; message.classList.add('message'); this.element.appendChild(message);
    }

    // Returns an object tha1t can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
      this.element.remove();
    }

    getElement() {
      return this.element;
    }

    getRepositories() {
      return Promise.all(
        atom.project.getDirectories().map(
          atom.project.getPaths
          .bind(atom.project)
        )
      ).then(_.compact);
    }

  }