import { dummyUsers } from "./dummyUsers";

const alex = dummyUsers[0];
const john = dummyUsers[1];
const oliver = dummyUsers[2];

export const dummyProjects = [
  {
    projectId: 1,
    name: "LaunchPad CRM",
    description:
      "A next-gen CRM for startups to manage customer pipelines, analytics, and automation.",
    startDate: "2025-10-10",
    dueDate: "2026-02-28",
    status: "ACTIVE",
    createdBy: alex,
    createdAt: "2025-10-13T08:01:35.491Z",
    tasks: [
      {
        taskId: 1,
        project: { projectId: 1, name: "LaunchPad CRM" },
        title: "Design Dashboard UI",
        description: "Create a modern, responsive CRM dashboard layout.",
        status: "IN_PROGRESS",
        dueDate: "2025-10-31",
        assignedTo: alex,
      },
      {
        taskId: 2,
        project: { projectId: 1, name: "LaunchPad CRM" },
        title: "Integrate Email API",
        description: "Set up SendGrid integration for email campaigns.",
        status: "TODO",
        dueDate: "2025-11-30",
        assignedTo: oliver,
      },
      {
        taskId: 3,
        project: { projectId: 1, name: "LaunchPad CRM" },
        title: "Fix Duplicate Contact Bug",
        description: "Duplicate records appear when importing CSV files.",
        status: "TODO",
        dueDate: "2025-12-05",
        assignedTo: alex,
      },
      {
        taskId: 4,
        project: { projectId: 1, name: "LaunchPad CRM" },
        title: "Add Role-Based Access Control (RBAC)",
        description: "Define user roles and permissions for the dashboard.",
        status: "IN_PROGRESS",
        dueDate: "2025-12-20",
        assignedTo: oliver,
      },
    ],
  },
  {
    projectId: 2,
    name: "Brand Identity Overhaul",
    description:
      "Rebranding client products with cohesive color palettes and typography systems.",
    startDate: "2025-10-18",
    dueDate: "2026-03-10",
    status: "PLANNING",
    createdBy: john,
    createdAt: "2025-10-13T08:15:27.895Z",
    tasks: [
      {
        taskId: 5,
        project: { projectId: 2, name: "Brand Identity Overhaul" },
        title: "Create New Logo Concepts",
        description: "Sketch and finalize 3 logo concepts for client review.",
        status: "IN_PROGRESS",
        dueDate: "2025-10-31",
        assignedTo: john,
      },
      {
        taskId: 6,
        project: { projectId: 2, name: "Brand Identity Overhaul" },
        title: "Update Typography System",
        description: "Introduce new font hierarchy with responsive scaling.",
        status: "TODO",
        dueDate: "2025-11-15",
        assignedTo: alex,
      },
      {
        taskId: 7,
        project: { projectId: 2, name: "Brand Identity Overhaul" },
        title: "Client Feedback Integration",
        description: "Implement client-requested adjustments to the brand guide.",
        status: "TODO",
        dueDate: "2025-10-31",
        assignedTo: john,
      },
    ],
  },
];
