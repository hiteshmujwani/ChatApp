import { useEffect } from "react";
import useAppStore from "../../store/slices/store";

export default function Profile() {
  const { userInfo } = useAppStore();
  return <div>Profile page</div>;
}
