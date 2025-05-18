'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Experience } from '../types'

interface ExperienceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience: Experience
  index: number
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  // 是否为新添加的工作经验
  isNew?: boolean
}

export function ExperienceDialog({
  open,
  onOpenChange,
  experience,
  index,
  onFormChange,
  onSave,
  onCancel,
  onDelete,
  isNew = false, // 默认为编辑模式
}: ExperienceDialogProps) {
  // 验证表单是否有效
  const isFormValid = 
    experience.title.trim() !== '' && 
    experience.company.trim() !== '' && 
    experience.duration.trim() !== '' && 
    experience.location.trim() !== '' && 
    experience.description.trim() !== '';
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel()
        onOpenChange(open)
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="text-black sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-xl border-none">
        <div className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-[#1f1f1f]">{isNew ? '添加工作经历' : '编辑工作经历'}</DialogTitle>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">职位名称</label>
            <input
              type="text"
              name="title"
              value={experience.title}
              onChange={(e) => onFormChange(e, index)}
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">公司</label>
            <input
              type="text"
              name="company"
              value={experience.company}
              onChange={(e) => onFormChange(e, index)}
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-[#1f1f1f]">工作时间</label>
              <input
                type="text"
                name="duration"
                value={experience.duration}
                onChange={(e) => onFormChange(e, index)}
                className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
                placeholder="例如：2020年3月 - 至今"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-[#1f1f1f]">工作地点</label>
              <input
                type="text"
                name="location"
                value={experience.location}
                onChange={(e) => onFormChange(e, index)}
                className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">工作描述</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition resize-none"
              value={experience.description}
              onChange={(e) => onFormChange(e, index)}
              placeholder="描述您的工作职责和成就..."
              maxLength={2000}
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-500">{experience.description.length}/2,000</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 flex justify-between border-t border-gray-200">
          {/* 只有在编辑模式下才显示删除按钮 */}
          {!isNew ? (
            <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-100 text-red-500 hover:text-red-600 hover:border-red-300" onClick={onDelete}>
              删除此经历
            </Button>
          ) : (
            <div>{/* 空占位元素，保持布局一致性 */}</div>
          )}
          <Button 
            className="bg-[#0a66c2] hover:bg-[#004182] rounded-full text-white" 
            onClick={onSave}
            disabled={!isFormValid}
          >
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
