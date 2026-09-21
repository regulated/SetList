"use client"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm, SubmitHandler } from "react-hook-form";

const TestForm = () => {

  return (
    <div>
      <form>
        {[...Array(/*ex.sets*/1)].map((_, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 p-1 items-center">
          <Input 
            className="col-span-3"
            id={"w" + index.toString()}
            name="weight" 
            type="number" 
            placeholder="225"
            required 
          />
          <Input
            className="col-span-3"
            id={"r" + index.toString()}
            name="reps"
            type="number"
            placeholder="8"
            required
          />
          {/*<button className="text-primary"><CheckCheck /></button> 
          */}
          <Checkbox  />
        </div>
        ))}
      </form>
    </div>
  )
}

export default TestForm
