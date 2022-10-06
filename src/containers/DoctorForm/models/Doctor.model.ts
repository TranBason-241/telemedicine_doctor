export type Doctor = {
    email: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    hospitalDoctors: { hospitalId: number }[];
    majorDoctors: { majorId: number }[];
};
