import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router";
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
import { useResetPassword } from "@/hooks/use-reset-password";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from "@/validations/auth";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const mutation = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) {
    return (
      <Card className="grid gap-4">
        <CardHeader>
          <CardTitle className="text-xl">Invalid link</CardTitle>
          <CardDescription>
            This reset link is incomplete.{" "}
            <Link to="/forgot-password" className="text-primary underline">
              Request a new one
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const onSubmit = handleSubmit(({ password }) =>
    mutation.mutate(
      { token, password },
      { onSuccess: () => navigate("/login", { replace: true }) },
    ),
  );

  return (
    <Card className="grid gap-4">
      <CardHeader>
        <CardTitle className="text-xl">Choose a new password</CardTitle>
        <CardDescription>
          You will be logged out on all devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="password">
              New password
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
            <p className="text-destructive text-sm">
              {mutation.error.message}{" "}
              <Link to="/forgot-password" className="underline">
                Request a new link
              </Link>
            </p>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Spinner /> : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ResetPasswordPage;
