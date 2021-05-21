// The field schema shape
interface FieldSchema {
    component: string;
    name: string;
    label: string;
    required?: boolean;
    validation?: any;
}

export { FieldSchema }