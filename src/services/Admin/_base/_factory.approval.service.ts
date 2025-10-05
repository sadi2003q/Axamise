// File: src/Services/Approval/approval.service.factory.ts

import { BaseApprovalService } from './_base.approval.service';
import { Admin_ApproveEventService } from '../_admin.approve.event.service';
import { Admin_ApproveService } from '../_admin.approver.service';
import { SERVICE } from "../../../Utilities";


export class ApprovalService {
    static createService(type: string): any {
        switch (type) {
            case SERVICE.APPROVAL_EVENT:
                return new Admin_ApproveEventService();
            case SERVICE.APPROVAL_QUESTION:
                return new Admin_ApproveService();
            default:
                throw new Error(`Unknown approval service type: ${type}`);
        }
    }
}