// The field schema shape
interface FieldSchema {
    component: string;
    name: string;
    label: string;
    required?: boolean;
}

// The form schema shape
interface FormSchema {
    fields: FieldSchema[],
    validation: any;
    values: { [k: string]: any };
}

export { FieldSchema, FormSchema }