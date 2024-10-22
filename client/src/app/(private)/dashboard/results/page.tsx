
"use client"
import ContractAnalysisResults from "@/components/analysis/contract-analysis-result";
import { useContractStore } from "@/store/zustand";

export default function ContractResultsPage() {
    const analysisResults= useContractStore((state)=>state.analysisResults);

    return (
       <ContractAnalysisResults
       isActive={true}
       contractId={analysisResults?._id}
       analysisResults={analysisResults}
       
       />
    )
    
}


