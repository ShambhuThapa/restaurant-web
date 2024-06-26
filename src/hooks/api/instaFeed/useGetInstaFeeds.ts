import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const instaUrl = `https://graph.instagram.com/me`;
const token =
  "IGQWRPOF94SkpoRnhYX2NCYUk2b0FwYjNHRnE0T3I1OHRZAZADlVRXRvNjB2NUF3SHNHc0I4ZA1A2b1gtTjMwWVByckZAJekkzekd3ZAlBEcnc1RllDV3Y0OXVMbHNEOE1NTDdoMURJR0ppanBpbWNJeExfMW0zb1dqOTgZD";

const getInstaFeed = async () => {
  try {
    const res = await axios.get(
      instaUrl + `/media?fields=media_url&access_token=${token}&limit=1000000`
    );

    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useGetInstaFeed = () => {
  return useQuery({
    queryKey: ["all_insta_feed"],
    queryFn: getInstaFeed,
  });
};
