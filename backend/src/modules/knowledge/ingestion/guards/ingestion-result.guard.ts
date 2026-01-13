export interface GuardResult {
    allowed: boolean;
    reason?: string;
    severity?: 'warning' | 'error';
}