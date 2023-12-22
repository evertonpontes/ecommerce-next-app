export async function dataURLToFormData(dataURL: string) {
  const result = await fetch(dataURL);

  const blob = await result.blob();

  const formData = new FormData();
  formData.append("file", blob);

  return formData;
}
