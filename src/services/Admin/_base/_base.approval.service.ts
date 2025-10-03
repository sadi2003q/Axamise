// File: src/Services/Approval/_base.approval.service.ts

import { Firebase_Response } from "../../../Utilities";
import { QuestionListService } from '../../Questions/_question_list.service';

export abstract class BaseApprovalService {
    abstract getAllPending(): Promise<Firebase_Response>;
    abstract approve(id: string, data?: any): Promise<Firebase_Response>;
}