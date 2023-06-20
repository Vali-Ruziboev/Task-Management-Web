import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "../../utils/validationSchemas";
import {
  useCsrfMutation,
  useLoginMutation,
  useSignupMutation,
} from "../../services/authAPI";
import { useEffect } from "react";
import { useUserQuery } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { taskAPI } from "../../services/taskAPI";
import { reset } from "../../features/task/taskSlice";

const Auth = ({ login = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login ? loginSchema : signupSchema),
    mode: "onChange",
  });

  const [getCSRF] = useCsrfMutation();
  const [signup] = useSignupMutation();
  const [handleLogin] = useLoginMutation();
  const { data: user, refetch } = useUserQuery();

  const onSubmit = async (data) => {
    const processing = toast.loading("Processing...");
    await getCSRF();
    let response = null;
    if (!login) {
      response = await signup(data);
    } else {
      response = await handleLogin(data);
    }

    toast.done(processing);
    if (response.error) {
      response.error.status === 422
        ? toast.error("Wrong credentials")
        : toast.error("Something went wrong");
    } else {
      toast.success("Success!");
      refetch();
      navigate("/");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(taskAPI.util.resetApiState());
    dispatch(reset());
  }, []);
  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] max-w-[25rem] shadow-lg p-10 rounded-lg space-y-4"
      >
        {!login && (
          <Input
            label="Name"
            name="name"
            placeholder="Your name"
            register={register("name")}
            error={errors.name}
          />
        )}
        <Input
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          register={register("password")}
          error={errors.password}
        />
        {!login && (
          <Input
            label="Confirm password"
            name="password_confirmation"
            placeholder="Confirm your password"
            type="password"
            register={register("password_confirmation")}
            error={errors.password_confirmation}
          />
        )}
        <Button type="submit">{login ? "Login" : "Signup"}</Button>
      </form>
    </div>
  );
};

export default Auth;
