

export class Participant {
    constructor({
        uid = '',
        name = '',
        date = '',
        submitCount = 1,
        points = 0,

     }) {
        this.uid = uid;
        this.name = name;
        this.date = date;
        this.submitCount = submitCount;
        this.points = points;
    }
}


