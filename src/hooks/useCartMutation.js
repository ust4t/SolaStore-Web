import axios from "axios";
import { useMutation } from "react-query";

const useCartMutation = (cartName) => {
  return useMutation(cartName, async ({ url }) => {
    return await axios.post(url);
  });
};

export default useCartMutation;
