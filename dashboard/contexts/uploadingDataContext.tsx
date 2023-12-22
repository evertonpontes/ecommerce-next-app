import { createContext, useState } from "react";

export interface UploadingDataContextType {
  isUploadingData: boolean;
  setUploadingData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadingDataContext = createContext<UploadingDataContextType>({
  isUploadingData: false,
  setUploadingData: () => {},
});

interface UploadingDataProviderProps {
  children: React.ReactNode;
}

export const UploadingDataProvider = ({
  children,
}: UploadingDataProviderProps) => {
  const [isUploadingData, setUploadingData] = useState<boolean>(false);

  return (
    <UploadingDataContext.Provider
      value={{ isUploadingData, setUploadingData }}
    >
      {children}
    </UploadingDataContext.Provider>
  );
};
