import {ListRenderItem} from "react-native";
import {List} from "components/List/List";
import {Clinic} from "types/api/clinic/types";
import {VetClinicListItem} from "components/Screens/Clinics/VetClinicListItem";
import {ClinicApi} from "../../../api/clinic/clinic.api";

export const VetClinicList = () => {
    const renderClinic: ListRenderItem<Clinic> = ({item}) => <VetClinicListItem clinic={item}/>;

    return <List onFetch={ClinicApi.getClinicsAssignedToVet}
                 renderItem={renderClinic} separateOptions/>
}
