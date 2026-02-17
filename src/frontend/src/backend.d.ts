import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export type ServiceType = {
    __kind__: "repair";
    repair: null;
} | {
    __kind__: "cleaning";
    cleaning: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "consumableReplacement";
    consumableReplacement: null;
};
export interface Order {
    id: bigint;
    serviceType: ServiceType;
    owner: Principal;
    timestamp: Time;
    details: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(serviceType: ServiceType, details: string): Promise<bigint>;
    getAllOrders(): Promise<Array<Order>>;
    getAvailableServiceTypes(): Promise<Array<ServiceType>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
