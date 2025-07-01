import Link from "next/link";
import { Download, FileText, Eye, Zap, Sparkles, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-slate-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-300/30 to-slate-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="w-2 h-2 text-blue-400/60" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-slate-700 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 animate-pulse shadow-lg">
            <Sparkles className="w-4 h-4 animate-spin" />
            Free & Privacy-First
          </div>
          <h1 className="text-7xl font-black text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-blue-700 to-slate-600 bg-clip-text text-transparent animate-pulse">
            Rezzume
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Create professional, ATS-friendly resumes instantly. No account required. 
            <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent font-bold"> Download as PDF</span> and start applying today.
          </p>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">No Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-600 text-lg">
                Start building your resume immediately without creating an account.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-600 text-lg">
                See your changes in real-time as you edit your resume.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Download className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">PDF Export</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-600 text-lg">
                Download a clean, ATS-friendly PDF ready for applications.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Additional features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-r from-blue-100/80 to-slate-200/80 p-8 rounded-3xl border border-blue-300/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              ATS-Optimized
            </h3>
            <p className="text-slate-600 text-lg">
              Built with semantic HTML structure that Applicant Tracking Systems love to parse.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-100/80 to-slate-200/80 p-8 rounded-3xl border border-blue-300/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Privacy-First
            </h3>
            <p className="text-slate-600 text-lg">
              Your data never leaves your browser. No servers, no tracking, no accounts.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-bold py-8 px-12 rounded-2xl text-xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
            <Link href="/builder">
              <FileText className="w-6 h-6 mr-3" />
              Start Building Your Resume
            </Link>
          </Button>
          <p className="text-slate-500 mt-8 text-lg font-medium">
            Your data stays in your browser - we never see your information
          </p>
        </div>
      </div>
    </div>
  );
} 