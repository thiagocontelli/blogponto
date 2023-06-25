import Form from "@/components/Form";

export default function NewPost() {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h2 className="font-bold text-2xl w-full text-left">Add a new post</h2>

      <Form />
    </div>
  )
}
