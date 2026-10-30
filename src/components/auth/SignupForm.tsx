import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormData,
} from "@/schemas/auth";

import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/atoms/button/Button";
import TextInput from "@/components/ui/molecules/text-input/TextInput";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

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
    } else {
      navigate("/login");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <TextInput
        label="Username"
        name="username"
        placeholder="Username"
        register={register}
        error={errors.username?.message}
      />

      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message}
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        Sign Up
      </Button>
    </form>
  );
}