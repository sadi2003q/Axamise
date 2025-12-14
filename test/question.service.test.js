// Path: src/services/Questions/__tests__/question.service.test.js

import { QuestionService } from "../_factory.question.service.js";
import QuestionCreateService from "../_question_create.service.js";
import { QuestionListService } from "../_question_list.service.js";
import { SolveService } from "../_solving_section.service.js";
import { SERVICE } from "../../../Utilities.js";

describe("QuestionService Factory", () => {

  test("createService returns QuestionCreateService instance", () => {
    const service = QuestionService.createService(SERVICE.QUESTION_CREATE);
    expect(service).toBeInstanceOf(QuestionCreateService);
  });

  test("createService returns QuestionListService instance", () => {
    const service = QuestionService.createService(SERVICE.QUESTION_LIST);
    expect(service).toBeInstanceOf(QuestionListService);
  });

  test("createService returns SolveService instance", () => {
    const service = QuestionService.createService(SERVICE.SOLVE);
    expect(service).toBeInstanceOf(SolveService);
  });

  test("createService throws error for unknown type", () => {
    expect(() => QuestionService.createService("UNKNOWN_TYPE")).toThrow(
      "Unknown Service type for questions: UNKNOWN_TYPE"
    );
  });

});
