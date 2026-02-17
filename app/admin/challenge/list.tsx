import { Datagrid, List, ReferenceField, TextField, NumberField, SelectField } from "react-admin";

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="questions" label="Question" />
                <SelectField source="type"
                    choices={[
                        { id: "ASSIST", name: "ASSIST" },
                        { id: "SELECT", name: "SELECT" },
                    ]}
                />
                <ReferenceField source="lessonId" reference="lessons" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    );
};