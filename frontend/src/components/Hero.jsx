import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="relative flex flex-col items-center justify-center text-center px-4 mt-20 md:mt-20">
      <div className="relative z-10 mt-36 mb-12">
        <div className="border border-white/20 dark:border-zinc-700 p-6 md:px-12 md:py-20 rounded-lg backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 shadow-lg">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
            Generate Detailed LeetCode Editorials Instantly.
          </h1>
          <p className="text-lg md:text-xl mt-4 text-primary/60 max-w-2xl mx-auto">
            Unlock comprehensive explanations, step-by-step algorithms, and curated test cases for any LeetCode problem. Enhance your coding practice with clarity and efficiency.
          </p>
          <div className="flex justify-center mt-8 gap-4">
            <Link to="/home">
              <Button variant="default" size="lg" className="flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <canvas className="pointer-events-none absolute inset-0 mx-auto" id="canvas"></canvas>
    </section>
  );
}
