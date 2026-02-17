import { SimpleForm, Create, TextField, required, TextInput, ReferenceInput, SelectInput, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
    return(
    <Create>
        <SimpleForm>
          <TextInput source="text" validate={[required()]} label="Text"/>
         <BooleanInput source="correct" label="Correct option"/>
          <ReferenceInput source="challengeId" reference="challenges"/>
          <TextInput source="imageSrc"  label="Image URL"/>
          <TextInput source="audioSrc"  label="Audio URL"/>

        </SimpleForm>
    </Create>
    )
}