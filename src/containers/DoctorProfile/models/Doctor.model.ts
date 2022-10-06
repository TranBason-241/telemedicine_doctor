import { CertificationDoctor } from "./CertificationDoctor.model";
import { HospitalDoctor } from "./HospitalDoctor.model";
import { MajorDoctor } from "./MajorDoctor.model";

export type Doctor = {
    id?: number;
    email: string;
    name: string;
    avatar: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: number;
    numberOfCancels: number;
    rating: number;
    isVerify: boolean;
    isActive: boolean;
    certificationDoctors: CertificationDoctor[];
    hospitalDoctors: HospitalDoctor[];
    majorDoctors: MajorDoctor[];
};
export type DoctorFromAdd = {
    id?: number;
    email: string;
    name: string;
    avatar: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: number;
    numberOfCancels: number;
    rating: number;
    isVerify: boolean;
    isActive: boolean;
    certificationDoctors: { certificationId: number; evidence: string; dateOfIssue: string }[];
    hospitalDoctors: { hospitalId: number }[];
    majorDoctors: { majorId: number }[];
};

export type DoctorPraticing = {
    id?: number;
    email: string;
    name: string;
    avatar: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: number;
    rating: number;
    isVerify: boolean;
    isActive: boolean;
};

export type CetificationAdd = {
    certificationId: number;
    evidence: string;
    dateOfIssue: string;
};
