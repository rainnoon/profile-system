'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface AboutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  about: string
  onFormChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSave: () => void
  onCancel: () => void
}

export function AboutDialog({ open, onOpenChange, about, onFormChange, onSave, onCancel }: AboutDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel()
        onOpenChange(open)
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="text-black sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-[#1f1f1f]">编辑个人简介</DialogTitle>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-gray-600 mb-2">您可以介绍工作经验、所属行业及技能等，也可以谈谈您的成就或者在工作经历。</p>
          <textarea
            name="about"
            className="w-full border border-gray-300 rounded-md p-3 min-h-[250px] focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition resize-none"
            value={about}
            onChange={onFormChange}
            placeholder="分享您的背景、成就和兴趣..."
            maxLength={2600}
          />
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-500">{about.length}/2,600</span>
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
