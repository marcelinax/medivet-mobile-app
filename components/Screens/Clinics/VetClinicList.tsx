import {ListRenderItem} from "react-native";
import {List} from "components/List/List";
import {Clinic} from "types/api/clinic/types";
import {VetClinicListItem} from "components/Screens/Clinics/VetClinicListItem";
import {ClinicApi} from "../../../api/clinic/clinic.api";
import {useSelector} from "react-redux";
import {RootState} from "store/store";
import {User} from "types/api/user/types";

export const VetClinicList = () => {
    const user = useSelector((state: RootState) => state.user.currentUser) as User;

    const renderClinic: ListRenderItem<Clinic> = ({item}) => <VetClinicListItem clinic={item}/>;

    return <List onFetch={(params) => ClinicApi.getClinicsAssignedToVet(user.id, params)} renderItem={renderClinic}/>
}
