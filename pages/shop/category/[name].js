import { useRouter } from "next/router";
import Shop from "../../../src/layout/Shop";

const Name = () => {
  const router = useRouter();
  const { name } = router.query;
  return <Shop keyValueForQurey="category" value={name} active_={0} />;
};

export default Name;
