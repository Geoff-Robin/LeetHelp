import { Star } from "lucide-react";

const words = [
  "Problem Explanation",
  "Step-by-Step Solutions",
  "Algorithm Insights",
  "Complexity Analysis",
  "Code Implementation",
  "Test Case Validation",
  "AI-Powered Editorials",
  "LeetCode Mastery",
];

export default function TapeSection() {
  return (
    <div className="py-16 lg:py-24 overflow-hidden mb-0">
      <div className="bg-gradient-to-tr from-indigo-600 to-indigo-700 -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-move-left gap-4 py-3 will-change-transform">
            {[...words, ...words].map((word, index) => (
              <div key={index} className="inline-flex gap-4 items-center px-4">
                <span className="uppercase font-bold text-sm">{word}</span>
                <Star className="h-6 w-6 -rotate-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
