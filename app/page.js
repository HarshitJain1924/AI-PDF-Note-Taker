"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserButton, useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BookOpen, Brain, Lightbulb, Zap } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
    if (isSignedIn) {
      checkUser()
    }
  }, [isSignedIn])

  const checkUser = async () => {
    if (user) {
      const result = await createUser({
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl,
        userName: user.fullName,
      })
      console.log(result)
      router.push('/dashboard')
    }
  }

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 bg-primary rounded-full" />
            <span className="font-bold text-lg">PDFMaster AI</span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
            Testimonials
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
            FAQ
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button onClick={handleGetStarted} className="bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
              Get Started
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
              alt="Background pattern"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Simplify <span className="text-primary">PDF</span>{" "}
                    <span className="text-blue-500">Note</span>-Taking
                    <br />
                    with AI-Powered Magic
                  </h1>
                  <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Elevate your note-taking experience with our AI-powered PDF app. Seamlessly extract key insights,
                    summaries, and annotations from any PDF with just a few clicks.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button onClick={handleGetStarted} className="bg-primary text-primary-foreground rounded-full px-8 hover:bg-primary/90">
                    Get started
                  </Button>
                  <Button variant="outline" className="rounded-full px-8">
                    Learn more
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <Image
                  src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80"
                  alt="AI Document Analysis"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <Zap className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <CardTitle>AI-Powered Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  Get instant, accurate summaries of your PDFs, saving you hours of reading time.
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <Brain className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <CardTitle>Smart Annotations</CardTitle>
                </CardHeader>
                <CardContent>
                  Our AI suggests relevant annotations and highlights key information automatically.
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <BookOpen className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <CardTitle>Easy Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  Organize your notes and PDFs effortlessly with our intuitive tagging and folder system.
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <Lightbulb className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <CardTitle>Insights Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  Uncover hidden insights and connections across multiple PDFs with our advanced AI analysis.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
              alt="Background pattern"
              fill
              className="object-cover opacity-5"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  role: "Student",
                  quote: "PDFMaster AI has revolutionized my study habits. I can now breeze through research papers in record time!",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                },
                {
                  name: "Sarah Lee",
                  role: "Researcher",
                  quote: "The AI-powered insights have helped me discover connections in my data that I would have otherwise missed.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
                },
                {
                  name: "Michael Brown",
                  role: "Business Analyst",
                  quote: "This tool has significantly reduced the time I spend on report analysis. It's a game-changer for my workflow.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
                },
              ].map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "How accurate are the AI-generated summaries?", a: "Our AI model has been trained on a vast corpus of academic and professional documents, achieving over 95% accuracy in summary generation." },
                { q: "Can I use PDFMaster AI offline?", a: "While the AI features require an internet connection, you can access and read your saved notes and PDFs offline." },
                { q: "Is my data secure?", a: "Absolutely. We use end-to-end encryption and never store your original PDFs on our servers. Your privacy and data security are our top priorities." },
                { q: "How many PDFs can I process per month?", a: "Our basic plan allows for 50 PDFs per month. For unlimited PDF processing, check out our premium plans." },
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>{item.a}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
              alt="Background pattern"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="container px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your PDF Experience?</h2>
            <p className="mb-8 text-lg">Join thousands of satisfied users and start your journey with PDFMaster AI today.</p>
            <Button onClick={handleGetStarted} className="bg-white text-primary rounded-full px-8 hover:bg-gray-100">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">PDFMaster AI</span>
            <p className="text-sm">© 2024 PDFMaster AI. All rights reserved.</p>
          </div>
          <nav className="flex gap-4">
            <Link className="text-sm hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}