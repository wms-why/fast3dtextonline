import { decodeText } from "@/lib/utils";
import { OnlyPage } from "../page";

export default function Page({ params }: { params: { data: string } }) {

  const data = params['data']

  let backgroundProp, textProp

  if (data) {
    try {
      const { bg, text } = JSON.parse(decodeText(data));

      backgroundProp = bg;
      textProp = text;
    } catch (error) {
      console.error("parse data from url error", error)
    }
  }

  return (<OnlyPage textProp={textProp} backgroundProp={backgroundProp}></OnlyPage>)

}