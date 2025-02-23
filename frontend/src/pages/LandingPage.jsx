import { Features } from "@/components/Features";
import Navbar from "@/components/Navbar";
import TapeSection from "@/components/TapeSection";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/Footer";
export default function LandingPage(){
    return (
        <div>
            <Navbar/>
            <Hero/>
            <TapeSection/>
            <Features/>
            <Footer/>
        </div>
    )
}   