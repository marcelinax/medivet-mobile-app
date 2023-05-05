import {DefaultLayout} from "layouts/Default.layout";
import {useNavigation, useRoute} from "@react-navigation/native";
import {EditAnimalScreenNavigationProps, EditAnimalScreenRouteProps} from "types/Navigation/types";
import {useEffect, useState} from "react";
import {hasInternalError} from "../../api/error/services";
import {useErrorAlert} from "hooks/Alerts/useErrorAlert";
import {Animal} from "types/api/animal/types";
import {AnimalForm} from "components/Screens/Animals/AnimalForm";
import {LoadingContainer} from "components/Composition/LoadingContainer";
import {AnimalApi} from "../../api/animal/animal.api";
import {commonTranslations} from "constants/translations/common.translations";

export const EditAnimalScreen = () => {
    const route = useRoute<EditAnimalScreenRouteProps>();
    const {drawErrorAlert, handleErrorAlert} = useErrorAlert();
    const [animal, setAnimal] = useState<Animal | undefined>(undefined);
    const navigation = useNavigation<EditAnimalScreenNavigationProps>();

    useEffect(() => {
        onFetchAnimal();
    }, []);

    const onFetchAnimal = async () => {
        try {
            const params = {include: 'breed,coatColor'};
            const res = await AnimalApi.getOwnerAnimal(route.params.animalId, params);
            navigation.setOptions({
                headerShown: true,
                headerTitle: `${commonTranslations.EDIT} "${res.name}"`
            });
            setAnimal(res);
        } catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();
        }
    }

    return (
        <DefaultLayout>
            <>
                {drawErrorAlert()}
                {
                    !animal ? <LoadingContainer/> :
                        <AnimalForm animal={animal}/>
                }
            </>
        </DefaultLayout>
    );
}
