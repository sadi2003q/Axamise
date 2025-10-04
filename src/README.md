
# Frontend Source Directory Structure

This document outlines the file structure for the `frontend/src` directory.

```
/Users/sadi_/Coding/Axamise/frontend/src/
├───asset/
│   ├───background_video.mp4
│   ├───component.md
│   ├───logo.jpg
│   └───viewModelCode.js
├───Components/
│   ├───Custom/
│   │   ├───FlowingMenu.jsx
│   │   └───Particels.jsx
│   ├───__Admin_Approval_Events.jsx
│   ├───__Admin_Approval.jsx
│   ├───__Admin_Login.jsx
│   ├───__Admin_SetUser.jsx
│   ├───__Animation.jsx
│   ├───__Common.jsx
│   ├───__Event_Create.jsx
│   ├───__Event_Show.jsx
│   ├───__Feed.jsx
│   ├───__LogIn.jsx
│   ├───__Profile.jsx
│   ├───__Question_Create.jsx
│   ├───__Question_List.jsx
│   ├───__SignUp.jsx
│   └───__Solving_Section.jsx
├───controller/
│   ├───Admin/
│   │   ├───admin.approve.controller.js
│   │   └───admin.approve.event.controller.js
│   ├───Authentication/
│   │   ├───admin.login.controller.js
│   │   ├───admin.setUser.controller.js
│   │   ├───login.controller.js
│   │   └───signup.controller.js
│   ├───Events/
│   │   ├───event_create.controller.js
│   │   └───event_show.controller.js
│   ├───Others/
│   └───Questions/
│       ├───question_create.controller.js
│       ├───question_list.controller.js
│       └───solving_section.controller.js
├───models/
│   ├───AdminApproval_Model.js
│   ├───AdminInfo_Model.js
│   ├───Base_Model.js
│   ├───Event_Model.js
│   ├───Notification_Model.js
│   ├───Question_Model.js
│   ├───Student_Model.js
│   ├───User_Model.js
│   └───Validaiton_Model.js
├───pages/
│   ├───Admin/
│   │   ├───Admin_Approval.jsx
│   │   └───Admin_ApprovalEvent.jsx
│   ├───Authentication/
│   │   ├───Admin_login.jsx
│   │   ├───Admin_SetUser.jsx
│   │   ├───Login.jsx
│   │   └───Signup.jsx
│   ├───Events/
│   │   ├───Event_Create.jsx
│   │   └───Event_Show.jsx
│   ├───Questions/
│   │   ├───Question_Create.jsx
│   │   ├───Question_List.jsx
│   │   └───Solving_Section.jsx
│   ├───users/
│   │   ├───Feed.jsx
│   │   └───Profile.jsx
│   └───test.jsx
├───services/
│   ├───Admin/
│   │   ├───_base/
│   │   │   ├───_base.approval.service.ts
│   │   │   └───_factory.ts
│   │   ├───_admin.approve.event.service.ts
│   │   └───_admin.approver.service.ts
│   ├───Authentication/
│   │   ├───_base/
│   │   │   ├───_base.login.service.ts
│   │   │   └───_base_signup.service.ts
│   │   ├───_admin.login.service.ts
│   │   ├───_admin.setUser.service.ts
│   │   ├───_Authentication.service.ts
│   │   ├───_login.service.ts
│   │   ├───_signup.service.ts
│   │   └───README.md
│   ├───Events/
│   │   ├───_repositories/
│   │   │   └───_IEventRepository.ts
│   │   ├───_event_create.service.ts
│   │   └───_event_show.service.ts
│   ├───Others/
│   │   └───_Notification.service.js
│   └───Questions/
│       ├───_question_create.service.js
│       ├───_question_list.service.js
│       └───_solving_section.service.js
├───ViewModel/
│   └───Profile_ViewModel.js
├───firebase.js
├───GlobalContext.jsx
├───main.jsx
└───Utilities.ts
```
