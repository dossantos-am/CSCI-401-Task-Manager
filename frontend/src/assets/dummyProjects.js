import { dummyUsers } from "./dummyUsers";

export const dummyProjects = [

{

"projects": [
            {
                "id": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                "name": "LaunchPad CRM",
                "description": "A next-gen CRM for startups to manage customer pipelines, analytics, and automation.",
                "priority": "HIGH",
                "status": "ACTIVE",
                "start_date": "2025-10-10T00:00:00.000Z",
                "end_date": "2026-02-28T00:00:00.000Z",
                "team_lead": "user_1",
                "workspaceId": "org_1",
                "progress": 65,
                "createdAt": "2025-10-13T08:01:35.491Z",
                "updatedAt": "2025-10-13T08:01:45.620Z",
                "tasks": [
                    {
                        "id": "24ca6d74-7d32-41db-a257-906a90bca8f4",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "title": "Design Dashboard UI",
                        "description": "Create a modern, responsive CRM dashboard layout.",
                        "status": "IN_PROGRESS",
                        "type": "FEATURE",
                        "priority": "HIGH",
                        "assigneeId": "user_1",
                        "due_date": "2025-10-31T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:04:04.084Z",
                        "updatedAt": "2025-10-13T08:04:04.084Z",
                        "assignee": dummyUsers[0],
                        "comments": []
                    },
                    {
                        "id": "9dbd5f04-5a29-4232-9e8c-a1d8e4c566df",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "title": "Integrate Email API",
                        "description": "Set up SendGrid integration for email campaigns.",
                        "status": "TODO",
                        "type": "TASK",
                        "priority": "MEDIUM",
                        "assigneeId": "user_3",
                        "due_date": "2025-11-30T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:10:31.922Z",
                        "updatedAt": "2025-10-13T08:10:31.922Z",
                        "assignee": dummyUsers[2],
                        "comments": []
                    },
                    {
                        "id": "0e6798ad-8a1d-4bca-b0cd-8199491dbf03",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "title": "Fix Duplicate Contact Bug",
                        "description": "Duplicate records appear when importing CSV files.",
                        "status": "TODO",
                        "type": "BUG",
                        "priority": "HIGH",
                        "assigneeId": "user_1",
                        "due_date": "2025-12-05T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:11:33.779Z",
                        "updatedAt": "2025-10-13T08:11:33.779Z",
                        "assignee": dummyUsers[0],
                        "comments": []
                    },
                    {
                        "id": "7989b4cc-1234-4816-a1d9-cc86cd09596a",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "title": "Add Role-Based Access Control (RBAC)",
                        "description": "Define user roles and permissions for the dashboard.",
                        "status": "IN_PROGRESS",
                        "type": "IMPROVEMENT",
                        "priority": "MEDIUM",
                        "assigneeId": "user_3",
                        "due_date": "2025-12-20T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:12:35.146Z",
                        "updatedAt": "2025-10-13T08:12:35.146Z",
                        "assignee": dummyUsers[2],
                        "comments": []
                    }
                ],
                "members": [
                    {
                        "id": "17dc3764-737f-4584-9b54-d1a3b401527d",
                        "userId": "user_1",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "user": dummyUsers[0]
                    },
                    {
                        "id": "774b0f38-7fd7-431a-b3bd-63262f036ca9",
                        "userId": "user_2",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "user": dummyUsers[1]
                    },
                    {
                        "id": "573354b2-6649-4c7e-b4cc-7c94c93df340",
                        "userId": "user_3",
                        "projectId": "4d0f6ef3-e798-4d65-a864-00d9f8085c51",
                        "user": dummyUsers[2]
                    }
                ]
            },
            {
                "id": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                "name": "Brand Identity Overhaul",
                "description": "Rebranding client products with cohesive color palettes and typography systems.",
                "priority": "MEDIUM",
                "status": "PLANNING",
                "start_date": "2025-10-18T00:00:00.000Z",
                "end_date": "2026-03-10T00:00:00.000Z",
                "team_lead": "user_2",
                "workspaceId": "org_1",
                "progress": 25,
                "createdAt": "2025-10-13T08:15:27.895Z",
                "updatedAt": "2025-10-13T08:16:32.157Z",
                "tasks": [
                    {
                        "id": "a51bd102-6789-4e60-81ba-57768c63b7db",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "title": "Create New Logo Concepts",
                        "description": "Sketch and finalize 3 logo concepts for client review.",
                        "status": "IN_PROGRESS",
                        "type": "FEATURE",
                        "priority": "MEDIUM",
                        "assigneeId": "user_2",
                        "due_date": "2025-10-31T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:16:19.936Z",
                        "updatedAt": "2025-10-13T08:16:19.936Z",
                        "assignee": dummyUsers[1],
                        "comments": []
                    },
                    {
                        "id": "c7cafc09-5138-4918-9277-5ab94b520410",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "title": "Update Typography System",
                        "description": "Introduce new font hierarchy with responsive scaling.",
                        "status": "TODO",
                        "type": "IMPROVEMENT",
                        "priority": "MEDIUM",
                        "assigneeId": "user_1",
                        "due_date": "2025-11-15T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:17:36.730Z",
                        "updatedAt": "2025-10-13T08:17:36.730Z",
                        "assignee": dummyUsers[0],
                        "comments": []
                    },
                    {
                        "id": "53883b41-1912-460e-8501-43363ff3f5d4",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "title": "Client Feedback Integration",
                        "description": "Implement client-requested adjustments to the brand guide.",
                        "status": "TODO",
                        "type": "TASK",
                        "priority": "LOW",
                        "assigneeId": "user_2",
                        "due_date": "2025-10-31T00:00:00.000Z",
                        "createdAt": "2025-10-13T08:18:16.611Z",
                        "updatedAt": "2025-10-13T08:18:16.611Z",
                        "assignee": dummyUsers[1],
                        "comments": []
                    }
                ],
                "members": [
                    {
                        "id": "32ad603e-c290-4f6e-860b-10212e1b080d",
                        "userId": "user_1",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "user": dummyUsers[0],
                    },
                    {
                        "id": "10e8e546-ac59-474a-a3fc-768795810c65",
                        "userId": "user_2",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "user": dummyUsers[1],
                    },
                    {
                        "id": "5a1f3c12-fcb2-40ef-91ee-dbd582219a8b",
                        "userId": "user_3",
                        "projectId": "e5f0a667-e883-41c4-8c87-acb6494d6341",
                        "user": dummyUsers[2],
                    }
                ]
            }
        ],
        "owner": dummyUsers[2],
    }
]
