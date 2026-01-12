// prisma-error.util.ts
export function prismaUniqueConstraintHasField(
  meta: unknown,
  field: string,
): boolean {
  if (!meta || typeof meta !== 'object') return false;

  const adapterError = (meta as any).driverAdapterError;
  const cause = adapterError?.cause;

  if (!cause || cause.kind !== 'UniqueConstraintViolation') return false;

  const constraint = cause.constraint;

  // Adapter PG format: { fields: ['email'] }
  if (constraint?.fields && Array.isArray(constraint.fields)) {
    return constraint.fields.includes(field);
  }

  return false;
}