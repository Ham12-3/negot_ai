import { ContractAnalysis } from "@/interfaces/contract.interface";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import OverallScoreChart from "./chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {motion} from "framer-motion"
import { Badge } from "../ui/badge";
interface IContractAnalysisResultsProps {
  analysisResults: ContractAnalysis;
  isActive: boolean;
  contractId: string;
}

export default function ContractAnalysisResults({
  analysisResults,
  isActive,
  contractId,
}: IContractAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");

  const getScore = () => {
    const score = 54; // analysisResults.overallScore ?? 0;
    if (score > 70) {
      return { icon: ArrowUp, color: "text-green-500", text: "Good" };
    }
    if (score < 50) {
      return { icon: ArrowDown, color: "text-red-500", text: "Bad" };
    }
    return { icon: Minus, color: "text-yellow-500", text: "Average" };
  };

  const scoreTrend = getScore();
  const getSeverityColor =(severity:string) => {
    switch(severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }


  const getImpactColor = (impact:string) => {
    switch(impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  const renderRisksAndOpportunities = (
    items: Array<{
      risk?: string;
      opportunity?: string;
      explanation?: string;
      severity?: string;
      impact?: string;
    }>,
    type: "risks" | "opportunities"
  ) => {
    const displayItems = isActive ? items : items.slice(0, 3);
    const fakeItems = {
      risk: type === "risks" ? "Hidden Risk" : undefined,
      opportunity: type === "opportunities" ? "Hidden Opportunity" : undefined,
      explanation: "Hidden Explanation",
      severity: "low",
      impact: "low",
    };

    return (
      <ul className="space-y-4">
        {displayItems.map((item, index) => (
          <motion.li
            className="border rounded-lg p-4"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-lg">
                {type === "risks" ? item.risk : item.opportunity}
              </span>
              {(item.severity || item.impact) && (
                <Badge
                  className={
                    type === "risks"
                      ? getSeverityColor(item.severity!)
                      : getImpactColor(item.impact!)
                  }
                >
                  {(item.severity || item.impact)?.toUpperCase()}
                </Badge>
              )}
            </div>
            <p className="mt-2 text-gray-600">
              {type === "risks" ? item.explanation : item.explanation}
            </p>
          </motion.li>
        ))}
        {!isActive && items.length > 3 && (
          <motion.li
            className="border rounded-lg p-4 blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: displayItems.length * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-lg">
                {type === "risks" ? fakeItems.risk : fakeItems.opportunity}
              </span>
              <Badge>
                {(fakeItems.severity || fakeItems.impact)?.toUpperCase()}
              </Badge>
            </div>
          </motion.li>
        )}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <div className="flex space-x-2 ">{/* ASK AI BUTTON  */}</div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Overall Contract Score</CardTitle>
          <CardDescription>
            Based on risks and opportunities identified
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl font-bold">
                  {/* {analysisResults.overallScore ?? 0}  */}
                  45
                </div>
                <div className={`flex items-center ${scoreTrend.color}`}>
                  <scoreTrend.icon className="size-6 mr-1" />
                  <span className="font-semibold">{scoreTrend.text}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk</span>
                  <span>34%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Opportunities</span>
                  <span>34%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This score represent the overall risk and opportunities
                identified in the contract.
              </p>
            </div>
            <div className="w-1/2 h-48">
              <OverallScoreChart overallScore={78} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">
                Summary

            </TabsTrigger>
            <TabsTrigger value="risks">
                Risks

            </TabsTrigger>
            <TabsTrigger value="opportunities">
                Opportunities

            </TabsTrigger>
            <TabsTrigger value="details">
                Details

            </TabsTrigger>


        </TabsList>
        <TabsContent value="summary">
            <Card>
                <CardHeader>
                    <CardTitle>Contract Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg leading-relaxed">
                        This is summary of the contract
                        {/* {analysisResults.summary}  */}
                        </p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="risks">
            <Card>
                <CardHeader>
                    <CardTitle>Risks</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderRisksAndOpportunities([
                        {
                            risk: "Hidden Risk",
                            explanation: "Hidden Explanation",
                            severity: "low",
                            impact: "low",
                        },
                        {
                            risk: "Hidden Risk",
                            explanation: "Hidden Explanation",
                            severity: "low",
                            impact: "low",
                        },
                        {
                            risk: "Hidden Risk",
                            explanation: "Hidden Explanation",
                            severity: "low",
                            impact: "low",
                        },
                        {
                          risk: "Hidden Risk",
                          explanation: "Hidden Explanation",
                          severity: "low",
                          impact: "low",
                      },
                       
                    ], "risks")}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
