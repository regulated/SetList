import Image from "next/image";
import Form from 'next/form';
import { revalidatePath } from 'next/cache';

import { Suspense } from 'react';
import * as React from 'react';

import { createClient } from "@/lib/supabase/server";


import { WorkoutView }  from "@/app/components/workoutView";

//shadcn
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

// Lucide
import { SendHorizontal, Send, CheckCheck } from "lucide-react"


export default async function Exercises(child) {
  const supabase = await createClient();
  const { data: exercises, error } = await supabase
    .from("exercise")
    .select()
    .eq('workout_id', child.day);

  return <>
    <div className = "flex flex-col">
      {exercises?.map((ex, index) => (
        <Card className="max-w-sm m-1" key={index}>
          <CardHeader>
            <CardTitle>{ex.name}</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 items-start">
                <h2 className="col-span-3">Reps</h2>
                <h2 className="col-span-3">Weight</h2>
                <div></div>
              </div>
              <form>
                {[...Array(ex.sets)].map((_, index) => (
                <div key={index} className="grid grid-cols-7 gap-4 p-1 items-center">
                  <Input
                    className="col-span-3"
                    id={"r" + index.toString()}
                    name="reps"
                    type="number"
                    placeholder="8"
                    required
                  />
                  <Input 
                    className="col-span-3"
                    id={"w" + index.toString()}
                    name="weight" 
                    type="number" 
                    placeholder="225"
                    required 
                  />
                  <button><CheckCheck /></button> 
                </div>
                ))}
              </form>
            </CardContent>
          </Card>
      ))}
        <div className="flex flex-col items-center">
          <button className="flex flex-row gap-2 p-4">End Workout<Send /></button> 
        </div>
    </div>
  </>;
}
