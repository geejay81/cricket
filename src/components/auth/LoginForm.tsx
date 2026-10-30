import { supabase } from "@/lib/supabase";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/atoms/button/Button";
import TextInput from "@/components/ui/molecules/text-input/TextInput";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    const { error } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        Log In
      </Button>
    </form>
  );
}