import Image from "next/image";
import Form from 'next/form';
import { revalidatePath } from 'next/cache';

import { Suspense } from 'react';
import * as React from 'react';

import { createClient } from "@/lib/supabase/server";


import WorkoutView from "@/app/components/workoutView";
import Exercises from "@/app/components/Exercises";

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
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-8 px-8 bg-white dark:bg-zinc-800 sm:items-start">

        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-200">
          Set List
        </h1>
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <WorkoutView />
          {/*pass data in here as children*/}
          
          <Suspense fallback={<div>Loading Exercises...</div>}>
            <Exercises day={1}></Exercises>
          </Suspense>

        </div>
      </main>
    </div>
  );
}
