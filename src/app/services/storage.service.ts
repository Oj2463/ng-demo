import { Injectable } from '@angular/core';
import { LocalStorage } from '../util/local-storage';
import { RespGetUser } from '../api-service/modals/RespGetUser';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public LoggedUser = new LocalStorage<RespGetUser>(StorageKey.LoggedUser);

  public clear() {
    localStorage.clear();
  }
}

enum StorageKey {
  LoggedUser = '__LoggedUser__',
}
