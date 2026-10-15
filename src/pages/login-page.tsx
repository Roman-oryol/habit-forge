import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/use-login";
import { loginFormSchema, type LoginFormValues } from "@/validations/auth";

const LoginPage = () => {
  const mutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <Card className="grid gap-4">
      <CardHeader>
        <CardTitle className="text-xl">Log in</CardTitle>
        <CardDescription>Welcome back to HabitForge.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span className="text-destructive text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="password">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span className="text-destructive text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {mutation.isError && (
            <p className="text-destructive text-sm">{mutation.error.message}</p>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Spinner /> : "Log in"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            No account yet?{" "}
            <Link to="/register" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
export default LoginPage;
