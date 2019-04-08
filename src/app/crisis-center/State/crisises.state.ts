import { Crisis } from '../crisis';
import * as fromRoot from 'src/app/state/app.state';

export interface CrisisesState {
  crisises: Crisis[];
}

export interface State extends fromRoot.State {
  crisises: CrisisesState;
}
