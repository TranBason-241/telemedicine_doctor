export type Drug = {
    id?: number;
    name: string;
    producer: string;
    drugOrigin: string;
    drugForm: string;
    drugType?: DrugType;
    drugTypeId: number;
    isActive: boolean;
};

export type DrugType = {
    id?: number;
    name: string;
    description?: string;
    isActive: boolean;
};
