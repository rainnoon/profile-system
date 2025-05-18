import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LinkedinIcon, Users2Icon, BriefcaseIcon, SearchIcon, BellIcon, MessageSquareIcon, HomeIcon } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between  pb-2 pt-3">
        <div className="flex items-center gap-2">
          <LinkedinIcon className="h-8 w-8 text-[#0a66c2]" />
          <div className="relative w-64 hidden md:block">
            <input type="text" placeholder="搜索" className="w-full bg-gray-100 rounded-md py-2 px-3 pl-8 text-sm outline-none" />
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={`flex flex-col items-center text-xs group ${pathname.split('/').filter(Boolean).length === 1 ? 'text-[#0a66c2] border-b-2 border-[#0a66c2]' : 'text-gray-500 hover:text-black'}`}
          >
            <HomeIcon className="h-6 w-6 group-hover:animate-bounce-once" />
            <span>首页</span>
          </Link>
          <a href="#" className="flex flex-col items-center text-xs text-gray-500 hover:text-black group">
            <Users2Icon className="h-6 w-6 group-hover:animate-bounce-once" />
            <span>人脉</span>
          </a>
          <a href="#" className="flex flex-col items-center text-xs text-gray-500 hover:text-black group">
            <BriefcaseIcon className="h-6 w-6 group-hover:animate-bounce-once" />
            <span>工作</span>
          </a>
          <a href="#" className="flex flex-col items-center text-xs text-gray-500 hover:text-black group">
            <MessageSquareIcon className="h-6 w-6 group-hover:animate-bounce-once" />
            <span>消息</span>
          </a>
          <a href="#" className="flex flex-col items-center text-xs text-gray-500 hover:text-black group">
            <BellIcon className="h-6 w-6 group-hover:animate-bounce-once" />
            <span>通知</span>
          </a>
          <div className="relative group">
            <Link href="/profile" className="size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <img className="size-10 rounded-full" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces" alt="用户头像" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
