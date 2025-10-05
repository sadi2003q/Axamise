export class Solve_Model {
    solver_id: string;
    question_id: string;
    date: Date;
    solve_code: string;
    event_id?: string;

    constructor({
        solver_id,
        question_id,
        date,
        solve_code,
        event_id = "not assigned",
    }: {
        solver_id: string;
        question_id: string;
        date: Date;
        solve_code: string;
        event_id?: string;
    }) {
        this.solver_id = solver_id;
        this.question_id = question_id;
        this.date = date;
        this.solve_code = solve_code;
        this.event_id = event_id;
    }
}