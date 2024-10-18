import { ContractAnalysis } from "@/interfaces/contract.interface";
import { useState } from "react";

interface IContractAnalysisResultsProps {
    analysisResults:ContractAnalysis;
    contractId:string;
}


export default function ContractAnalysisResults({}:IContractAnalysisResultsProps) {
    const [activeTab, setActiveTab] = useState("summary");
    return (
        <div className="container mx-auto px-4 py-8">
<div className="flex justify-between items-center mb-6">
<h1 className="text-3xl font-bold">Analysis Results</h1>
<div className="flex space-x-2 ">

    {/* ASK AI BUTTON  */}



</div>

</div>


        </div>
    )
}