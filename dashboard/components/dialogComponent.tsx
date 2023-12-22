import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  UploadingDataContext,
  UploadingDataContextType,
} from "@/contexts/uploadingDataContext";

import iconPerfil from "@/public/icon-perfil.png";

import { Edit } from "lucide-react";

import Image from "next/image";
import { useContext } from "react";
import { SpinnerCircle } from "./spinners";
import { Button } from "./ui/button";

interface props {
  children: React.ReactNode;
  urlImage: string;
  uploadedImage: string | null;
  handleCancel: () => void;
  handleSave: () => void;
}

const DialogComponent = ({
  children,
  handleCancel,
  handleSave,
  urlImage,
  uploadedImage,
}: props) => {
  const { isUploadingData } =
    useContext<UploadingDataContextType>(UploadingDataContext);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isUploadingData} className="cursor-pointer">
        <Button
          variant="link"
          className="h-28 w-28 rounded-full overflow-hidden border relative"
        >
          <div className="w-full h-full flex justify-center items-center bg-gray-950/5 absolute z-10">
            {isUploadingData ? (
              <SpinnerCircle classColor="primary" size="md" />
            ) : (
              <Edit className="text-muted-foreground dark:text-secondary" />
            )}
          </div>
          <Image
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            src={urlImage || iconPerfil}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Image Editor</AlertDialogTitle>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} disabled={!uploadedImage}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogComponent;
