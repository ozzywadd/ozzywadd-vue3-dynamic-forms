// The field schema shape
interface FieldSchema {
    component: string;
    name: string;
    label: string;
    value?: string;
    required?: boolean;
    readonly?: boolean;
    hidden?: boolean;
    logic?: (dymanicForm: any) => void;
    validation?: any;
}

export { FieldSchema }