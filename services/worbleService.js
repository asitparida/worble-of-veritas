import { Subject } from 'rxjs';

class WorbleService {
    actionTaken = new Subject();
    actionTaken$ = this.actionTaken.asObservable();
    hideActions = new Subject();
    hideActions$ = this.hideActions.asObservable();
    isInboxShown = new Subject();
    isInboxShown$ = this.isInboxShown.asObservable();
    constructor() {
    }
}

export default WorbleManager = new WorbleService();