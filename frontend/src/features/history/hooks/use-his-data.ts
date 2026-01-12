import { ChatSession } from "../types";

export const MOCK_CHATS: ChatSession[] = [
    {
        id: '1',
        title: 'Q3 Financial Analysis and Forecasting',
        snippet: 'Based on the provided spreadsheets, your revenue growth is projected to hit 14% by...',
        timestamp: '2 hours ago',
        date: new Date(),
        tags: ['Revenue_Q3.xlsx', 'Forecast_Models.pdf'],
        isPinned: true,
    },
    {
        id: '2',
        title: 'Product Security Protocol Review',
        snippet: 'I have analyzed the security audit documentation. The primary vulnerability identified...',
        timestamp: '5 hours ago',
        date: new Date(),
        tags: ['Security_Audit.pdf', '+1 more'],
    },
    {
        id: '3',
        title: 'Customer Feedback Sentiment Analysis',
        snippet: 'Analyzing the latest 500 tickets, the sentiment remains largely positive with minor...',
        timestamp: 'Yesterday',
        date: new Date(Date.now() - 86400000),
        tags: ['Feedback_Dump.csv'],
    },
    {
        id: '4',
        title: 'Marketing Strategy Brainstorming',
        snippet: 'For the next quarter, we should focus on multi-channel attribution and personalized...',
        timestamp: 'Yesterday',
        date: new Date(Date.now() - 86400000),
        tags: ['Marketing_Plan_V2.docx'],
    },
    {
        id: '5',
        title: 'Employee Onboarding Workflow',
        snippet: 'The revised workflow for engineering hires includes three new technical stages...',
        timestamp: 'Oct 12',
        date: new Date(Date.now() - 86400000 * 5),
        tags: ['HR_Policy.pdf', 'Engineering_Guide.md'],
    },
    {
        id: '6',
        title: 'Database Migration Strategy',
        snippet: 'The transition from legacy SQL to the new cloud-native infrastructure requires...',
        timestamp: 'Oct 10',
        date: new Date(Date.now() - 86400000 * 7),
        tags: ['DB_Schema.sql', '+2 more'],
    }
];

const useHisData = () => {
    return {
        chats: MOCK_CHATS
    }
}

export { useHisData }