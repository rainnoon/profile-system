'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface PersonalInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    name: string
    title: string
    company: string
    location: string
  }
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onCancel: () => void
}

export function PersonalInfoDialog({ open, onOpenChange, formData, onFormChange, onSave, onCancel }: PersonalInfoDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel()
        onOpenChange(open)
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="text-black sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-[#1f1f1f]">编辑个人信息</DialogTitle>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">姓名</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={formData.name}
              onChange={onFormChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">职位</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={formData.title}
              onChange={onFormChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">公司</label>
            <input
              type="text"
              name="company"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={formData.company}
              onChange={onFormChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#1f1f1f]">地点</label>
            <input
              type="text"
              name="location"
              className="w-full border border-gray-300 rounded-md p-3 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition"
              value={formData.location}
              onChange={onFormChange}
            />
          </div>
        </div>

        <div className="px-6 py-3 flex justify-end border-t border-gray-200">
          <Button className="bg-[#0a66c2] hover:bg-[#004182] rounded-full text-white" onClick={onSave}>
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
