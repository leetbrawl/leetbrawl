import { Code2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0e0e10]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#10b981] rounded flex items-center justify-center">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">leetbrawl</span>
            </div>
            <p className="text-gray-400 text-sm">Real-time competitive coding platform for students and developers.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Platform</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                How it Works
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Problems
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Leaderboards
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Community</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Blog
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Help Center
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Status
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          © 2024 leetbrawl. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 