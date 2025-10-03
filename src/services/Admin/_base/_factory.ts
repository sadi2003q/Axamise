// File: src/Services/Approval/approval.service.factory.ts

import { BaseApprovalService } from './_base.approval.service';
import { Admin_ApproveEventService } from '../_admin.approve.event.service';
import { Admin_ApproveService } from '../_admin.approver.service';

export type ApprovalServiceType = 'event' | 'question';

export class ApprovalServiceFactory {
    static createService(type: ApprovalServiceType): any {
        switch (type) {
            case 'event':
                return new Admin_ApproveEventService();
            case 'question':
                return new Admin_ApproveService();
            default:
                throw new Error(`Unknown approval service type: ${type}`);
        }
    }
}