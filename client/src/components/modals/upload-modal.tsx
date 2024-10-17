/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useContractStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";


interface IUploadModalProps {
    isOpen:boolean;
    onClose:()=> void;
    onUploadComplete: ()=> void
}



export function UploadModal({isOpen,onClose,onUploadComplete}:IUploadModalProps) {

    const {setAnalysisResults} = useContractStore()

const [detectedType, setDetectedType] = useState<string | null>(null)

const [error, setError] = useState<string | null>(null)
const [step,setStep] = useState<string | null>(null)

    const {} = useMutation({
    mutationFn:async({file}:{file:File}) => {
        const formData = new FormData()
        formData.append("contract", file)

        const response = await api.post<{detectedType:string}>(`/contracts/detect-type`, formData, {

            headers: {
                "Content-Type":"multipart/form-data"
            }
        })

        return response.data.detectedType
    },

onSuccess:(data:string) => {
setDetectedType(data)
}


    })
    const {mutate:uploadFile, isPending:isProcessing} = useMutation({
        mutationFn:async({file}:{file:File})=> {

            const formData = new FormData()
formData.append("contract",file)

const response = await api.post(`/contracts/analyze`, formData, {
    headers: {
        "Content-Type":"multipart/form-data",

    }
})

return response.data
        },
        onSuccess:(data)=> {
            
setAnalysisResults(data)
onUploadComplete()
        }

    })

}