import { SimpleForm, Create, required, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const UnitCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="description" validate={[required()]} label="Description" />
                <ReferenceInput source="courseId" reference="courses">
                    <SelectInput optionText="title" validate={[required()]} label="Course" />
                </ReferenceInput>
                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Create>
    );
};