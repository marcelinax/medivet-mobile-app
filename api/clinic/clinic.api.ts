import {authClient} from "api/services";
import {Clinic} from "types/api/clinic/types";

export class ClinicApi {
    static async getClinicsAssignedToVet(vetId: number, params?: Record<string, any>): Promise<Clinic[]> {
        const res = await authClient.get(`clinics/assigned-to-vet`, {params});
        return res.data;
    }
}
