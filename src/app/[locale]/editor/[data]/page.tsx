import { OnlyPage } from "@/components/editor/OnlyPage";
import { decodeText } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ data: string }> }) {

  const { data } = await params

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