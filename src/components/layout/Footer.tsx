import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-white border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-2">
          <Link href="/" className="text-blue-600 font-semibold text-lg">
            EmployeeHub
          </Link>
        </div>
        <div className="text-sm text-gray-500">© {currentYear} EmployeeHub. All rights reserved.</div>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Privacy
          </Link>
          <Link href="/" className="hover:text-blue-600">
            Terms
          </Link>
          <Link href="/" className="hover:text-blue-600">
            Help Center
          </Link>
          <Link href="/" className="hover:text-blue-600">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
