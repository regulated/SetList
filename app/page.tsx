import Image from "next/image";
import Form from 'next/form'

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

async function Test1ngData() {
  const supabase = await createClient();
  const { data: test1ng } = await supabase
    .from("test1ng")
    .select()
    // .like('testString','%2%')
  // return <p>{JSON.stringify(test1ng, null, 2)}</p>;
  return <>
    <div className = "flex flex-col">
      {test1ng.map((test, index) => (
        <p key={index} className="font-bold text-zinc-200 p-4">{test.testString}</p>
      ))}
    </div>
  </>;
}

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
          
          <Suspense fallback={<div>Loading Test1ng...</div>}>
            <Test1ngData />
          </Suspense>
          <Suspense fallback={<div>Loading Exercises...</div>}>
            <Exercises />
          </Suspense>

          <h2 className="text-2xl">Bench</h2>
          <div className="flex flex-row gap-4 text-xl">
            <div>Reps</div>
            <input type="number" id="Rp" name="Reps" size="2" min="0" max="100" className="bg-white text-black"></input>
            <div>Weight</div>
            <input type="number" id="Wt" name="Weight" size="2" min="0" max="100" className="bg-white text-black"></input>
          </div>


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
                      id="reps"
                      type="number"
                      placeholder="8"
                      required
                    />
                    <Input
                      id="reps"
                      type="number"
                      placeholder="8"
                      required
                    />
                    <Input
                      id="reps"
                      type="number"
                      placeholder="8"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label>Weight</Label>
                    </div>
                    <Input id="w1" type="number" required />
                    <Input id="w2" type="number" required />
                    <Input id="w3" type="number" required />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>


          


          <Form>
            <input name="Weight" />
          </Form>


          
          {/*
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          */}
          
        </div>
      </main>
    </div>
  );
}
