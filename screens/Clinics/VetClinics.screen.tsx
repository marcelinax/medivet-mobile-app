import {ListLayout} from "layouts/List.layout";
import {VetClinicList} from "components/Screens/Clinics/VetClinicList";

export const VetClinicsScreen = () => {
    return (
        <ListLayout>
            <VetClinicList/>
        </ListLayout>
    )
}
