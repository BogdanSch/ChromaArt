import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { convertDate } from "shared/utils/helpers/dateHelper";

export function useCustomForm(
  setFormData: Dispatch<SetStateAction<any>> | null,
) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (!setFormData) return;
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, value, type, checked } = target;
      setFormData((prev: any) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? Number(value)
              : value,
      }));
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!setFormData) return;
    const target = e.target;
    const { name, value, type } = target;
    if (type !== "date") return;

    const formattedDate: string = convertDate(value);
    setFormData((prev: any) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (!setFormData) return;
    const { value } = e.target;
    setFormData(value);
  };
  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    previousImageUrl: string,
    setRequestError: Dispatch<SetStateAction<string>>,
  ): Promise<void> => {
    // if (!setFormData) return;
    // const file = e.target.files?.[0] || null;
    // if (file) {
    //   const imageUrl: string = (await uploadImageAsync(file)) || "";
    //   console.log(imageUrl);
    //   if (imageUrl.length === 0) {
    //     setRequestError("Failed to upload the image file.");
    //     return;
    //   }
    //   if (previousImageUrl.length > 0) await deleteAssetAsync(previousImageUrl);
    //   setFormData((prev: any) => ({
    //     ...prev,
    //     imageUrl: imageUrl,
    //   }));
    // } else {
    //   setRequestError("Failed to read the image file.");
    // }
  };

  return {
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleImageChange,
  };
}
