'use client'

import { api } from "@/server/api/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { remark } from "remark"
import remarkHtml from "remark-html"
import { MarkdownReader } from "./markdown-reader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { ButtonLoading } from "./ui/button-loading"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

export default function Form() {
  const { back, push } = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [raw, setRaw] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function isAllFieldsFilled(): boolean {
    let count = 0

    if (title.trim() === '' || description.trim() === '' || raw.trim() === '') {
      count++
    }

    return count === 0
  }
  
  async function submit() {
    if (!isAllFieldsFilled()) {
      toast({
        variant: "destructive",
        title: "Empty field(s)!",
        description: "Please fill in all fields and try again.",
      })
      return
    }
    
    setIsLoading(true)

    try {
      await api.post('/posts/new', { title, description, content: raw })

      toast({
        title: "Awesome!!",
        description: "The post was successfully created.",
      })
      
      push('/')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isPreview) {
      const markdown = remark().use(remarkHtml).processSync(raw)
      setContent(markdown.value as string)
    } else {
      setContent('')
    }
  }, [isPreview])

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="title">Title</Label>
        <Input maxLength={100} name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
        <span className="text-right text-sm">{title.length}/100</span>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="description">Description</Label>
        <Input maxLength={200} name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} />
        <span className="text-right text-sm">{description.length}/200</span>
      </div>

      <Tabs
        defaultValue='edit'
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => setIsPreview(false)} value='edit'>Write</TabsTrigger>
          <TabsTrigger onClick={() => setIsPreview(true)} value='preview'>Preview</TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-2" value="edit">
          <Textarea
            maxLength={5000}
            rows={20}
            className="resize-none"
            value={raw}
            onChange={e => setRaw(e.target.value)}
          />
          <span className="text-sm text-right">{raw.length}/5000</span>
        </TabsContent>
        <TabsContent value="preview">
          <div className="h-[438px] overflow-auto border p-4 rounded-md">
            <MarkdownReader content={content} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 w-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='secondary'>Cancel</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This is delete all changes that you made.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => back()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button onClick={submit}>Submit</Button>
        )}
      </div>
    </>
  )
}
