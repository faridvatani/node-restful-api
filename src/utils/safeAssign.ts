export const safeAssign = async <T>(
  promise: Promise<T>,
): Promise<[Error | null, T | null]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
};
