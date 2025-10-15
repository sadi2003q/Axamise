
// Define the return type for login
export interface Firebase_Response {
    success: boolean;
    user?: any;
    data?: any
    id?: string;
    error?: any;
    message?: string;
    output?: string;
}





export const SERVICE = {
    ADMIN_LOGIN: 'admin_login',
    ADMIN_SET_USER: 'admin_setUser',
    LOGIN: 'login',
    SIGNUP: 'sign_up',


    APPROVAL_QUESTION: 'approval_question',
    APPROVAL_EVENT: 'approval_event',


    EVENT_CREATE: 'event_create',
    EVENT_SHOW: 'event_show',


    QUESTION_CREATE: 'question_create',
    QUESTION_LIST: 'question_list',
    SOLVE: 'solve',
}




export const EVENT_APPROVAL_STATUS = {
    approved: 'approved',
    pending: 'pending',
    modify: 'modify'
}


export const Database = {
    question : 'questions',
    student : 'Students',
    event : 'Events',
    admins: 'Admins',
    approvedQuestions: 'ApprovedQuestions',
    notifications: 'Notifications',
    solves: 'Solves'
}

export const routes = {
    feed: '/FEED',
    event_create: '/EVENT_CREATE',
    login: '/LOGIN',
    signup: '/SIGN_UP',
    profile: '/PROFILE',
    question_create: '/QUESTION_CREATE',
    solving_page: '/SOLVE',
    event_show: '/EVENT_SHOW',
    question_list: '/QUESTION_LIST',
    admin_login: '/ADMIN_LOGIN',
    admin_setUser: '/ADMIN_SETUSER',
    approval_question: '/ADMIN_APPROVAL',
    approval_event: '/ADMIN_APPROVALEVENT',
}

export const ADMIN_APPROVAL_DISPLAY_MODE = {
    APPROVED: 'ApprovalMode',
    MODIFICATION: 'ModificationMode',
    REJECTED: 'RejectionMode'
}






export const Feed_Header = [
    "Coding exams test your problem-solving skills",
    "They measure logical thinking under pressure",
    "Exams improve your algorithmic understanding quickly",
    "They teach discipline in coding practices",
    "Coding exams highlight weak and strong areas",
    "They prepare you for real projects",
    "Exams encourage learning new coding techniques",
    "They increase confidence in programming abilities",
    "Coding tests sharpen debugging and analysis skills",
    "Exams help track progress over time",
    "They improve speed in writing efficient code",
    "Coding exams challenge creative problem-solving approaches",
    "They teach proper time management strategies",
    "Exams simulate real-world coding scenarios effectively",
    "They enhance memory of important coding concepts",
    "Coding tests promote consistent learning habits",
    "They prepare for interviews and technical rounds",
    "Exams make coding knowledge more practical",
    "They build resilience against programming challenges",
    "Coding tests strengthen algorithmic thinking patterns",
    "They motivate continuous improvement and learning",
    "Exams ensure readiness for competitive coding challenges"
];