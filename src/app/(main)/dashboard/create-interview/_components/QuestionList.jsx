import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });
      console.log(result.data);
    } catch (e) {
      toast("Server Error, try Again!");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {loading && (
          <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center ">
            <Loader2Icon className="animate-spin" />
            <div>
              <h2>Generating Interview Questions</h2>
              <p>
                Our AI is crafting personalized questions base on your job
                position
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionList;
