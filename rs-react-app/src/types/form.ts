import type { UserFormData } from "./user";

export interface FormProps {
  onSubmitSuccess: (data: UserFormData<string>) => void;
  onCloseModal: () => void;
}
