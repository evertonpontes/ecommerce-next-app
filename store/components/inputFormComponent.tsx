import {
  ChangeEventHandler,
  FocusEventHandler,
  Ref,
  useContext,
  forwardRef,
} from "react";
import {
  UploadingDataContext,
  UploadingDataContextType,
} from "@/contexts/uploadingDataContext";
import { Input } from "./ui/input";

interface iProps {
  placeholder?: string;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
}

export const InputFormComponent = forwardRef<HTMLInputElement, iProps>(
  function InputFormComponent(props, ref) {
    const { isUploadingData } =
      useContext<UploadingDataContextType>(UploadingDataContext);

    return (
      <Input
        placeholder={props.placeholder}
        disabled={isUploadingData}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        ref={ref}
        value={props.value}
      />
    );
  }
);
