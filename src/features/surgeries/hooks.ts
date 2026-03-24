import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSurgeries,
  createSurgery,
  updateSurgery,
  deleteSurgery,
} from "./api";

export const useSurgeries = () => {
  return useQuery({
    queryKey: ["surgeries"],
    queryFn: getSurgeries,
  });
};

export const useCreateSurgery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSurgery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surgeries"] });
    },
  });
};

export const useUpdateSurgery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateSurgery(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surgeries"] });
    },
  });
};

export const useDeleteSurgery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSurgery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surgeries"] });
    },
  });
};