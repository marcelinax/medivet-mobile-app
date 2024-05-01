export const getDeepValueOfListItemByChainedKey = (item: any, keys: string[]) => keys.reduce((acc, cur) => acc?.[cur] ?? null, item);
