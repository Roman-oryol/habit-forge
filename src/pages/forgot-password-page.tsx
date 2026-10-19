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
import { useForgotPassword } from "@/hooks/use-forgot-password";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormValues,
} from "@/validations/auth";

const ForgotPasswordPage = () => {
  const mutation = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(({ email }) => mutation.mutate(email));

  return (
    <Card className="grid gap-4">
      <CardHeader>
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>
          Enter your email and we will send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mutation.isSuccess ? (
          <div className="grid gap-4">
            <p className="text-sm">
              If an account with this email exists, a reset link is on its way.
              The link is valid for 1 hour.
            </p>
            <Link to="/login" className="text-primary text-sm underline">
              Back to log in
            </Link>
          </div>
        ) : (
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

            {mutation.isError && (
              <p className="text-destructive text-sm">
                {mutation.error.message}
              </p>
            )}

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Send reset link"}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              <Link to="/login" className="text-primary underline">
                Back to log in
              </Link>
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
export default ForgotPasswordPage;
