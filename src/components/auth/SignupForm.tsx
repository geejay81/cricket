import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormData,
} from "@/schemas/auth";

import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/button/Button";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(
    data: SignupFormData
  ) {
    const { error } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username")}
        placeholder="Username"
      />
      <p>{errors.username?.message}</p>

      <input
        {...register("email")}
        placeholder="Email"
      />
      <p>{errors.email?.message}</p>

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      <p>{errors.password?.message}</p>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        Sign Up
      </Button>
    </form>
  );
}