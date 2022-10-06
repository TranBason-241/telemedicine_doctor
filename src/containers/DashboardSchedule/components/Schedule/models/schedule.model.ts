import { Doctor, HealthCheck } from "src/containers/VideoCall/models/VideoCall.model";

export type Slot = {
    assignedDate: string;
    doctor: Doctor;
    doctorId: number;
    endTime: string;
    healthCheck: HealthCheck;
    healthCheckId: number;
    id: number;
    isActive: boolean;
    startTime: string;
};

export type SlotCM = {
    doctorId: number;
    assignedDate: string;
    endTime: string;
    startTime: string;
};
