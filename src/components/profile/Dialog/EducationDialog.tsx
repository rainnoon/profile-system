'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Education } from '../types'

interface EducationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  education: Education
  index: number
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  // 是否为新添加的教育经历
  isNew?: boolean
}

export function EducationDialog({
  open,
  onOpenChange,
  education,
  index,
  onFormChange,
  onSave,
  onCancel,
  onDelete,
  isNew = false, // 默认为编辑模式
}: EducationDialogProps) {
  // 验证表单是否有效
  const isFormValid = education.school.trim() !== '' && education.degree.trim() !== '' && education.years.trim() !== '';
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel()
        onOpenChange(open)
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className=" text-black  sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-[#1f1f1f]">{isNew ? '添加教育经历' : '编辑教育经历'}</DialogTitle>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">学校</label>
            <input
              type="text"
              name="school"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={education.school}
              onChange={(e) => onFormChange(e, index)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">学位/专业</label>
            <input
              type="text"
              name="degree"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={education.degree}
              onChange={(e) => onFormChange(e, index)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">学习时间</label>
            <input
              type="text"
              name="years"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={education.years}
              onChange={(e) => onFormChange(e, index)}
              placeholder="例如：2016 - 2020"
            />
          </div>
        </div>

        <div className="px-6 py-3 flex justify-between border-t border-gray-200">
          {/* 只有在编辑模式下才显示删除按钮 */}
          {!isNew ? (
            <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-100 text-red-500 hover:text-red-600 hover:border-red-300" onClick={onDelete}>
              删除此教育经历
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
