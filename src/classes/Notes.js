export default class Notes {
  constructor(title, content = "") {
    this.title = title;
    this.content = content;
    this.id = crypto.randomUUID();
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}
