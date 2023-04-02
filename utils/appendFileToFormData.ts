import { isAndroidPlatfrom } from './isAndroidPlatfrom';

export const appendFileToFormData = (photo: any, name: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: isAndroidPlatfrom() ? photo.uri : photo.uri.replace('file://', ''),
        name,
        type: 'image/jpeg'
    } as any);
    return formData;
};
