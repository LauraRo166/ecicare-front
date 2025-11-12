export type Role = "ADMINISTRATION" | "STUDENT" | "PROFESSOR" | "COLLABORATOR";

export interface UserEcicareDto {
  idEci?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  registrationDate?: string;
  hasMedicalApprove?: boolean;
}

export interface UserEcicareResponseDTO {
  idEci: number;
  name: string;
  email: string;
  registrationDate: string;
  role: Role;
  hasMedicalApprove: boolean;
}