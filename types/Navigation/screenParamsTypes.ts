export type MultiSelectScreenParams = {
    onFetch: (params?: Record<string, any>) => Promise<any[]>;
    title: string;
};

export type EditAnimalScreenParams = {
    animalId: number;
};
