import { useState } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ImageIcon } from "lucide-react";
import { Slider } from "./sliderComponent";

import DialogComponent from "./dialogComponent";
import { Button } from "./ui/button";

const ImageEditor = ({ field }: any) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [zoom, setZoom] = useState<number[]>([1]);
  const [urlImage, setUrlImage] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop,
  });

  const handleZoomChange = (value: number[]) => {
    setZoom(value);
  };

  const handleSave = async () => {
    if (editor) {
      const canvas = editor.getImage();
      const croppedImage = canvas.toDataURL();
      setTimeout(() => {
        field.onChange(croppedImage);
        setUrlImage(croppedImage);
      }, 500);
    }
  };

  const handleRemove = async () => {
    field.onChange("");
    setUrlImage("");
    setUploadedImage(null);
    setZoom([1]);
  };

  const handleCancel = () => {
    if (!urlImage) {
      field.onChange("");
      setUrlImage("");
      setUploadedImage(null);
      setZoom([1]);
    }
    return;
  };

  return (
    <div>
      <Card className="w-36 h-36 bg-muted flex justify-center items-center border-4 border-dashed dark:border-secondary-foreground/50 relative">
        <DialogComponent
          urlImage={urlImage}
          handleCancel={handleCancel}
          handleSave={handleSave}
          uploadedImage={uploadedImage}
        >
          {uploadedImage ? (
            <div className="relative">
              {uploadedImage && (
                <Button
                  type="button"
                  onClick={handleRemove}
                  className="absolute z-10 first-letter: rounded-full -right-4 -top-4"
                >
                  x
                </Button>
              )}
              <AvatarEditor
                ref={(editorInstance) => setEditor(editorInstance)}
                image={uploadedImage}
                width={200}
                height={200}
                border={25}
                borderRadius={100}
                scale={zoom[0]}
                className="rounded-md"
              />
              <div className="w-full gap-2">
                <Label className="w-full flex p-4 items-center gap-4">
                  Zoom:
                  <Slider
                    value={zoom}
                    min={1}
                    max={2}
                    step={0.01}
                    onValueChange={handleZoomChange}
                    minStepsBetweenThumbs={0}
                    className="bg-black/40"
                  />
                </Label>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-52 h-56 p-4 border-4 border-dashed dark:border-secondary-foreground/50 bg-muted rounded-md text-muted-foreground text-sm cursor-pointer font-normal flex flex-col items-center justify-center text-center gap-2"
            >
              <ImageIcon />
              Drag and drop an image here, or click to select one.
              <Input id="image" {...getInputProps()} />
            </div>
          )}
        </DialogComponent>
      </Card>
    </div>
  );
};

export default ImageEditor;
