/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useContractStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone'

interface IUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function UploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: IUploadModalProps) {
  const { setAnalysisResults } = useContractStore();

  const [detectedType, setDetectedType] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<
    "upload" | "detecting" | "confirm" | "processing" | "done"
  >("upload");

  const {data: detectedContractType} = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append("contract", file);

      const response = await api.post<{ detectedType: string }>(
        `/contracts/detect-type`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.detectedType;
    },

    onSuccess: (data: string) => {
      setDetectedType(data);
      setStep("confirm");
    },
    onError: (error) => {
      console.error(error);
      setError("Failed to detect the contract type");
      setStep("upload");
    },
  });
  const { mutate: uploadFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append("contract", file);

      const response = await api.post(`/contracts/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      setAnalysisResults(data);
      onUploadComplete();
    },
    onError: (error) => {
      console.error(error);
      setError("Failed to analyze the contract");
      setStep("upload");
    },
  });

  const onDrop = useCallback((acceptedFiles:File[])=> {
    if(acceptedFiles.length > 0) {
        setFiles(acceptedFiles)
setError(null)
setStep("upload")


    } else {
        setError("No file selected")

    }
  }, [])


  const {getRootProps, getInputProps, isDragActive} = useDropzone({
onDrop,
accept: {
    "application/pdf": [".pdf"],

},
maxFiles:1,
multiple:false
  })

  const handleFileUpload = () => {
    if(files.length > 0) {
        setStep("detecting")

detectedContractType({file:files[0]})
    }
  }
}
