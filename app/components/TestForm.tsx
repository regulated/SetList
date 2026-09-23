"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { SendHorizontal, Send, CheckCheck } from "lucide-react"

import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  weight: number;
  reps: number;
}

const TestForm = () => {

  const [selected, setSelected] = useState(new Set<IFormInput>());
  
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  }

  function toggleCheckbox(id) {
    setSelected((prev) => {
      const next = new Set<IFormInput>(prev);
      if (next.has(id)) {
        next.delete(id);
      }
      else {
        next.add(id);
      }
      return next;
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {[...Array(/*ex.sets*/2)].map((_, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 p-1 items-center">
          <Input 
            className="col-span-3"
            id={"w" + index.toString()}
            name="weight" 
            type="number" 
            placeholder="225"
            required 
            {...register("weight")}
          />
          <Input
            className="col-span-3"
            id={"r" + index.toString()}
            name="reps"
            type="number"
            placeholder="8"
            required
            {...register("reps")}
          />
          {/* <button className="text-primary"><CheckCheck /></button>  */}
          <Checkbox  />
        </div>
        ))}
      </form>
    </div>
  )
}

export default TestForm
