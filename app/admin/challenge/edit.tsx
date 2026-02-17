import { SimpleForm, Edit, required, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="questions" validate={[required()]} label="Question" />
                <SelectInput source="type"
                    choices={[
                        { id: "ASSIST", name: "ASSIST" },
                        { id: "SELECT", name: "SELECT" },
                    ]}
                    validate={[required()]}
                />
                <ReferenceInput source="lessonId" reference="lessons">
                    <SelectInput optionText="title" validate={[required()]} label="Lesson" />
                </ReferenceInput>
                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Edit>
    );
};