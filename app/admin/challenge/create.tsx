import { SimpleForm, Create, TextField, required, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeCreate = () => {
    return(
    <Create>
        <SimpleForm>
          <TextInput source="questions" validate={[required()]} label="Question"/>
          <SelectInput source="type"
          choices={[
            {
            id: "ASSEIT",
            name: "ASSEIT",
          },
          {
            id: "SELECT",
            name: "SELECT",
          }
          ]}
          validate={[required()]}
          />
                 
          
          <ReferenceInput source="lessonId" reference="lessons"/>
          <NumberInput source="order" validate={[required()]} 
          label="Order"
          />
        </SimpleForm>
    </Create>
    )
}