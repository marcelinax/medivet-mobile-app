import { AnimalForm } from "components/Screens/Animals/AnimalForm";
import { DefaultLayout } from "layouts/Default.layout";

export const CreateAnimalScreen = () => {
    return (
        <DefaultLayout>
            <AnimalForm />
        </DefaultLayout>
    );
};