import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  access_token: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;
