import {
  Button,
  VStack,
  HStack,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { Prisma } from "../../types";

export function AddPostForm({
  closePostForm,
  createPost,
}: {
  closePostForm: () => void;
  createPost: (post: Prisma.PostCreateInput) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Prisma.PostCreateInput>();

  const onSubmit: SubmitHandler<Prisma.PostCreateInput> = (data) => {
    createPost(data);
    reset();
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="title">
          <FormLabel fontSize="sm">Post Title</FormLabel>
          <Input type="text" {...register("title", { required: true })} />
        </FormControl>
        <FormControl id="body">
          <FormLabel fontSize="sm">Post Content</FormLabel>
          <Input type="text" {...register("body", { required: true })} />
        </FormControl>
        <FormControl id="author">
          <FormLabel fontSize="sm">Author</FormLabel>
          <Input type="text" {...register("author", { required: true })} />
          <FormHelperText mt={0.5} fontSize="sm">
            This will be the displayed author name.
          </FormHelperText>
        </FormControl>
        <HStack mt={2} justifyContent="center">
          <Button
            variant="solid"
            background="brand.green"
            color="white"
            type="submit"
          >
            Add
          </Button>
          <Button
            variant="solid"
            background="brand.red"
            color="white"
            type="reset"
            onClick={closePostForm}
          >
            Back
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
