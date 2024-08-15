import { useStore } from "@/store/store";
import { type GetUserSchema } from "@/types/authSchema";

// const useAuthUser = () => {
//   const [result, setResult] = useState<{
//     userData: GetUserSchema | null;
//     error: string | null;
//     isLoading: boolean;
//   }>({
//     userData: null,
//     error: null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await intApi.get("/auth/get-user");
//         setResult({
//           userData,
//           error: null,
//           isLoading: false,
//         });
//       } catch (err: any) {
//         setResult({
//           userData: null,
//           error: err.message,
//           isLoading: false,
//         });
//       }
//     };

//     fetchUserData();

//     // Clean-up function to cancel any ongoing requests or timers
//     return () => {
//       // Add clean-up logic here if needed
//     };
//   }, []); // Empty dependency array to ensure useEffect runs only once

//   return result;
// };

// const useAuthUser = () => {
//   const {
//     data: userData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["get-user"],
//     queryFn: async (): Promise<GetUserSchema> =>
//       (await intApi.get("/auth/get-user")).data,
//   });

//   return { userData, isLoading, error };
// };

const useAuthUser = () => {
  const { firstName, lastName } = useStore();

  let user = null;
  // const token = cookies().get("accessToken");

  // if (!token) return null;

  if (firstName.length && lastName.length)
    user = {
      firstName,
      lastName,
    };

  return user;
};

export default useAuthUser;
