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
import { useRegister } from "@/hooks/use-register";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/validations/auth";

const RegisterPage = () => {
  const mutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(({ email, password }) =>
    mutation.mutate({ email, password }),
  );

  return (
    <Card className="grid gap-4">
      <CardHeader>
        <CardTitle className="text-xl">Create account</CardTitle>
        <CardDescription>Start tracking your habits.</CardDescription>
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
              autoComplete="new-password"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span className="text-destructive text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="confirmPassword">
              Confirm password
            </Label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-destructive text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {mutation.isError && (
            <p className="text-destructive text-sm">{mutation.error.message}</p>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Spinner /> : "Create account"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
export default RegisterPage;
