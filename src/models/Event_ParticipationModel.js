
import { EVENT_STATE } from '../Utilities.js'

export class EventParticipationModel {
    constructor({
        title = '',
        eventID = '',
        time_of_participation = Date.now(),
        eventState = EVENT_STATE.Incomplete,
        score = 0,
        rank = 'Not Fixed'
    }) {
        this.title = title;
        this.eventID = eventID;
        this.time_of_participation = time_of_participation;
        this.eventState = eventState;
        this.score = score;
        this.rank = rank;
    }
}