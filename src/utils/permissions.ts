import { UserRole } from '@/types/enums';

/** Whether the given role can create new materials. */
export function canCreateMaterial(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can edit existing materials. */
export function canEditMaterial(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can create new suppliers. */
export function canCreateSupplier(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can edit existing suppliers. */
export function canEditSupplier(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can create new quotations. */
export function canCreateQuotation(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can edit existing quotations. */
export function canEditQuotation(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can finalize (lock) a quotation. */
export function canFinalizeQuotation(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

/** Whether the given role can archive a quotation. Only admins may archive. */
export function canArchiveQuotation(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

/** Whether the given role can manage user accounts and roles. */
export function canManageUsers(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

/** Whether the given role can view any module. All authenticated active users can view. */
export function canViewModule(_role: UserRole): boolean {
  return true;
}
