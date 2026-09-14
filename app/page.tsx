import Image from "next/image";
import Form from 'next/form'
import { revalidatePath } from 'next/cache'

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
import { SendHorizontal } from "lucide-react"

async function Exercises() {
  const supabase = await createClient();
  const { data: exercises, error } = await supabase
    .from("exercise")
    .select();

  console.log("exercises: ", exercises);
  console.log("error: ", error);
  
  return <>
    <div className = "flex flex-col">
      {exercises.map((ex, index) => (
        <p key={index} className="font-bold text-zinc-200 p-4">{ex.name}: {ex.max}</p>
      ))}
    </div>
  </>;
}

async function addSet(formData, ex: number) {
  const supabese = await createClient();
  const { error } = await supabase
    .from("set")
    .insert({
      reps: formData.get("reps"),
      weight: formData.get("weight"),
      exercise_id: ex
    });

  if (error) throw new Error(error.message);

  revalidatePath("/set");
}



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-zinc-800 sm:items-start">

        {/*
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        */}
        

        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-200">
            Set List
          </h1>

          <WorkoutView />
          {/*pass data in here as children*/}
          
          <Suspense fallback={<div>Loading Exercises...</div>}>
            <Exercises />
          </Suspense>

          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Bench</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-row gap-6">
                  <div className="grid gap-2">
                    <Label>Reps</Label>
                    <Input
                      id="r1"
                      name="reps"
                      type="number"
                      placeholder="8"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label>Weight</Label>
                    </div>
                    <Input id="w1" name="weight" type="number" required />
                  </div>
                  <button type="submit"><SendHorizontal /></button>
                </div>
              </form>
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  );
}
