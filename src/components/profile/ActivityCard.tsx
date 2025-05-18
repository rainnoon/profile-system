'use client'

import { Activity } from './types'
import { BookOpen, MessageSquare, ThumbsUp, Share2 } from 'lucide-react'

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  // 根据活动类型选择图标
  const getIcon = () => {
    switch (activity.type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-600" />
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-green-600" />
      case 'like':
        return <ThumbsUp className="h-5 w-5 text-red-600" />
      case 'share':
      default:
        return <Share2 className="h-5 w-5 text-purple-600" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="text-sm font-medium">{activity.title}</div>
          {activity.content && <p className="text-sm text-gray-600 mt-1">{activity.content}</p>}
          
          <div className="flex items-center gap-4 mt-2">
            {activity.likes !== undefined && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ThumbsUp className="h-3 w-3" /> {activity.likes}
              </div>
            )}
            {activity.comments !== undefined && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MessageSquare className="h-3 w-3" /> {activity.comments}
              </div>
            )}
            {activity.shares !== undefined && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Share2 className="h-3 w-3" /> {activity.shares}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
