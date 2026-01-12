// users/policies/user.policy.ts

class UserPolicy {
    static canView(requestUser, targetUser) {
        return (
            requestUser.id === targetUser.id ||
            requestUser.role === 'ADMIN'
        )
    }

    static canUpdate(requestUser, targetUser) {
        return this.canView(requestUser, targetUser);
    }
}