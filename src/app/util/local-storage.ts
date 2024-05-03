export class LocalStorage<T = any> {
  private _key: string;
  constructor(key: string) {
    this._key = key;
  }
  get(): T | null {
    return JSON.parse(localStorage.getItem(this._key) || 'null') as T | null;
  }
  set(data: T | null) {
    if (data == null) {
      this.remove();
      return;
    }
    localStorage.setItem(this._key, JSON.stringify(data));
  }
  remove() {
    localStorage.removeItem(this._key);
  }
}
