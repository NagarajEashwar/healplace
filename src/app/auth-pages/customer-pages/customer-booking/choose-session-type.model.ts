export interface IncludedPackage {
    modified: Date;
    id: string;
    practitioner_id: string;
    title: string;
    description: string;
    duration_min: number;
    price: number;
    commission?: any;
    is_active: boolean;
}

export interface Others {
    modified: Date;
    id: string;
    practitioner_id: string;
    title: string;
    description: string;
    duration_min: number;
    price: number;
    commission?: any;
    is_active: boolean;
}

export interface ChooseSessionTypeModel {
    included_packages: IncludedPackage[];
    others: Others[];
    total_session_message: string;
    message: string;
}



