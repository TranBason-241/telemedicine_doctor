export interface IUpdateHealthCheck {
    rating?: number;
    advice: string;
    comment?: string;
    healthCheckDiseases: Array<{ diseaseId: number }>;
    prescriptions: IDrug[];
    id?: number;
    symptomHealthChecks: any[];
}

export interface IDrug {
    healthCheckId: number;
    startDate: string;
    endDate: string;
    drugId: number;
    drugName: string;
    morningQuantity: number;
    afternoonQuantity: number;
    eveningQuantity: number;
    description: string;
}
