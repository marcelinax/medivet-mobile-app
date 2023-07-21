import { isAndroidPlatfrom } from './isAndroidPlatfrom';

export const appendFileToFormData = (photo: string, name: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: isAndroidPlatfrom() ? photo : photo.replace('file://', ''),
    name,
    type: 'image/jpeg',
  } as any);
  return formData;
};
