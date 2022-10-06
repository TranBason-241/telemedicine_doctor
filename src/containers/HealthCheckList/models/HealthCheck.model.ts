import { Patient } from "./Patient.model";

import { Doctor, Symptom } from "src/containers/VideoCall/models/VideoCall.model";

export type HealthCheck = {
    id?: number;
    height: number;
    weight: number;
    reasonCancel: string;
    rating: number;
    comment: string;
    advice: string;
    token: string;
    patientId: number;
    createdTime: string;
    canceledTime: string;
    patient: Patient;
    healthCheckDiseases: HealthCheckDiseas[];
    prescriptions: Prescription[];
    slots: Slot[];
    symptomHealthChecks: SymptomHealthCheck[];
    status: string;
};

export type HealthCheckDiseas = {
    id?: number;
    healthCheckId?: number;
    diseaseId?: number;
    isActive: boolean;
    disease: Disease;
};

export type Disease = {
    id?: number;
    diseaseCode: string;
    name: string;
    description: string;
    diseaseGroupId: number;
    diseaseGroup?: DiseaseGroup;
    isActive: boolean;
};

export type DiseaseGroup = {
    id?: number;
    groupName: string;
    isActive: boolean;
};

export type Prescription = {
    id?: number;
    healthCheckId: number;
    startDate: string;
    endDate: string;
    drugId: number;
    morningQuantity: number;
    afternoonQuantity: number;
    eveningQuantity: number;
    description: string;
    isActive: boolean;
    drug: Drug;
    drugTypeId: number;
};

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

export type Slot = {
    id?: number;
    assignedDate: string;
    doctorId?: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    doctor: Doctor;
};

export type SymptomHealthCheck = {
    id?: number;
    symptomId?: number;
    healthCheckId?: number;
    evidence: string;
    isActive: boolean;
    symptom: Symptom;
};

// export type HealthCheck = {
//     id?: number;
//     height: number;
//     weight: number;
//     reasonCancel: string;
//     rating: string;
//     comment: string;
//     advice: string;
//     paatientId: number;
//     createdTime: string;
//     canceledTime: string;
//     status: string;
//     patient?: Patient;
//     healthCheckDiseases: [];
//     prescription: [];
//     slots: [];
//     symptomHealthChecks: [];
// };

export type Order = "asc" | "desc";
