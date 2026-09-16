import * as React from 'react';

import { createClient } from "@/lib/supabase/server";

import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { SendHorizontal, Send, CheckCheck } from "lucide-react"

import { z } from 'zod';

import { useForm, SubmitHandler } from "react-hook-form"

const schema = z.object({
  reps: z.number().min(0).max(100),
  weight: z.number().min(0).max(2000)
});

type formData = z.infer<typeof schema>;

export default async function Workout(child: any) {
  const supabase = await createClient();
  const { data: exercises, error } = await supabase
    .from("exercise")
    .select()
    .eq('workout_id', child.day);

  return <>
    <div className = "flex flex-col gap-4">
      {exercises?.map((ex, index) => (
        <Card className="max-w-sm border-primary" key={index}>
          <CardHeader>
            <CardTitle>{ex.name}</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7">
                <h2 className="col-span-3">Weight</h2>
                <h2 className="col-span-3">Reps</h2>
                <div></div>
              </div>
              <form>
                {[...Array(ex.sets)].map((_, index) => (
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
                  <button className="text-primary"><CheckCheck /></button> 
                </div>
                ))}
              </form>
            </CardContent>
          </Card>
      ))}
        <div className="flex flex-col items-center">
          <button className="flex flex-row gap-2 ">
            Log Workout
            <Send className="text-chart-1" />
        </button> 
        </div>
    </div>
  </>;
}
