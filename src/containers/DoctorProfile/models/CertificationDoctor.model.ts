import { Cetification } from "./Cetification.model";

export type CertificationDoctor = {
    id: number;
    doctorId: number;
    certificationId: number;
    evidence: string;
    isActive: boolean;
    dateOfIssue: string;
    certification: Cetification;
};
