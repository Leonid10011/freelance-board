// tempTest.ts 

import { CreateProjectSchema } from "@/validation/project.schema"


const result = CreateProjectSchema.safeParse({
  title: "",
  budget: "abc",
  status: "active",
  priority: "high",
})

console.log(result)