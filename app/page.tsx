import { revalidatePath } from 'next/cache';

import { Suspense } from 'react';
import * as React from 'react';

import { createClient } from "@/lib/supabase/server";

import Workout from "@/app/components/Workout";

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
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-2 px-8 ">

        <h1 className="max-w-xs text-3xl font-semibold pb-4">
          Day 1
        </h1>
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <Suspense fallback={<div>Loading Workout...</div>}>
            <Workout day={1}></Workout>
          </Suspense>

        </div>
      </main>
    </div>
  );
}
