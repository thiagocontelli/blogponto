'use client'

import { api } from "@/server/api/client"
import { FormEvent, useState } from "react"

export default function Form() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.post('/posts/new', { title, content, description })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            maxLength={100}
            className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <span className="text-gray-500 text-sm">{title.length}/100</span>
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            maxLength={200}
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <span className="text-gray-500 text-sm">{description.length}/200</span>
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
          Content
        </label>
        <div className="mt-2">
          <textarea
            id="content"
            name="content"
            rows={10}
            maxLength={5000}
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
          <span className="text-gray-500 text-sm">{content.length}/5000</span>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
