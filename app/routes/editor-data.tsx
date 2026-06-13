// /editor/:data — encoded share-data editor.
//
// The `data` segment is opaque ciphertext produced by `encodeShareData`.
// In `ssr: false` mode, the loader cannot run server-side, so the decode
// happens in the component on first render. Encoded URLs are NOT in the
// prerender list — Cloudflare's SPA fallback (`__spa-fallback.html`)
// handles unknown paths, and the client router routes to this module.
import { useEffect, useState } from "react";
import { OnlyPage } from "@/components/editor/OnlyPage";
import { decode, type ShareObj } from "@/lib/share-data";
import type { Route } from "./+types/editor-data";

interface DecodedState {
  textProp?: ShareObj["text"];
  backgroundProp?: ShareObj["bg"];
  effectProp?: ShareObj["effect"];
  templateSlug?: string;
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Open shared 3D text in the editor" },
    { name: "robots", content: "noindex, follow" },
  ];
}

export default function EditorDataPage({ params }: Route.ComponentProps) {
  const [state, setState] = useState<DecodedState | null>(null);

  useEffect(() => {
    if (!params.data) return;
    try {
      const decoded = decode(params.data);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({
        textProp: decoded.text,
        backgroundProp: decoded.bg,
        effectProp: decoded.effect,
        templateSlug: decoded.templateSlug,
      });
    } catch {
      // Bad ciphertext — render an empty editor rather than crashing.
      setState({
        textProp: undefined,
        backgroundProp: undefined,
        effectProp: undefined,
      });
    }
  }, [params.data]);

  // While the client effect runs (or never runs if the URL is malformed),
  // show a loading skeleton. The editor itself is interactive, so the
  // decode must happen before mounting <OnlyPage> (which initializes
  // Three.js with the decoded state).
  if (!state) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading editor…</p>
      </div>
    );
  }

  return (
    <OnlyPage
      textProp={state.textProp}
      backgroundProp={state.backgroundProp}
      effectProp={state.effectProp}
      currentStyle={undefined}
      relatedStyles={[]}
    />
  );
}
