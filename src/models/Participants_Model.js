

export class Participant {
    constructor({
        uid = '',
        name = '',
        date = '',
        submitCount = 0,
        points = 0,

     }) {
        this.uid = uid;
        this.name = name;
        this.date = date;
        this.submitCount = submitCount;
        this.points = points;
    }
}


