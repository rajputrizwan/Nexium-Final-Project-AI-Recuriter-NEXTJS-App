import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
// Optional: safer JSON parsing
// import JSON5 from "json5";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const interview_id = uuidv4();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });
      let content = result.data.content;

      console.log("🧪 Raw AI content:", content);

      // Remove markdown formatting if present
      content = content.replace(/```json|```/g, "").trim();

      // Extract the first valid JSON object or array
      const match = content.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (!match) throw new Error("No valid JSON structure found");

      let parsed;
      try {
        parsed = JSON.parse(match[0]);
      } catch (err) {
        // Unsafe fallback
        parsed = eval("(" + match[0] + ")");
      }

      // Extract interviewQuestions array
      const questions = Array.isArray(parsed)
        ? parsed
        : parsed.interviewQuestions;

      if (!Array.isArray(questions)) {
        throw new Error("Parsed data is not an array of questions");
      }

      setQuestionList(questions);
    } catch (e) {
      console.error("❌ Parsing or API error:", e.message || e);
      toast("⚠️ AI returned an invalid format. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user.email,
          interview_id: interview_id,
        },
      ])
      .select();
  };

  return (
    <div>
      <div>
        {loading && (
          <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
            <Loader2Icon className="animate-spin" />
            <div>
              <h2>Generating Interview Questions</h2>
              <p className="text-primary font-medium">
                Our AI is crafting personalized questions based on your job
                position
              </p>
            </div>
          </div>
        )}

        {!loading && questionList.length > 0 && (
          <div>
            <QuestionListContainer questionList={questionList} />
          </div>
        )}
      </div>

      <div className="flex mt-5 justify-end">
        <Button className="px-10" onClick={onFinish} disabled={loading}>
          {loading ? "Generating..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
