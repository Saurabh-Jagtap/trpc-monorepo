import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { formRouter } from "./routes/form/route";
import { formFieldRouter } from "./routes/form-field/route";
import { submitResponseRouter } from "./routes/responses/route";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  forms: formRouter,
  formFields: formFieldRouter,
  responses: submitResponseRouter
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
